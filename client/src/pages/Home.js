import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Badge, DropdownButton, NavDropdown, Button } from 'react-bootstrap';
import BubbleChart from '../components/BubbleChart';
import { withRouter } from 'react-router';

var moment = require('moment');

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      content: "",
      fetchMode: 1,
      posts: [],
      hidden: [],
      voted: [],
    }

    this.onClickPostHandler = this.onClickPostHandler.bind(this);
    this.onClickVoteHandler = this.onClickVoteHandler.bind(this);
    this.fetchPosts = this.fetchPosts.bind(this);
  }

  onClickPostHandler(event) {
    event.preventDefault();

    this.props.history.push('/Post');
  }

  onClickVoteHandler(postId, index) {
    if(!this.state.voted[index]) {
    fetch('http://localhost:5000/api/votePost', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        postId: postId
      }),
    }).then(res => res.json())
      .then(result => {
        if (result && result.success) {
          let temp = this.state.posts
          temp[index].counter += 1
          this.setState({posts: temp})
        } else {
          // TODO: show error to user
        }
      });
      let temp = this.state.voted;
      temp[index] = true
      this.setState({voted: temp})
      console.log(this.state.voted)
    }
  }

  fetchPosts() {
    fetch('http://localhost:5000/api/getPosts')
      .then(result => result.json())
      .then(result => {
        if (result && result.posts) {
          var hidden = result.posts.map(x => true);
          var voted = result.posts.map(x => false);

          this.setState({
            posts: result.posts,
            hidden: hidden,
            voted: voted
          })

        }
      }).catch(error => {
        console.log(error);
      });
  }

  show(index) {
    let temp = this.state.hidden;
    temp[index] = !this.state.hidden[index]
    this.setState({hidden: temp})
  }

  changeMode(mode) {
    this.setState({fetchMode: mode})
    let temp = this.state.posts
    if (mode === 1) {
      console.log("sort by time")
      temp.sort(function(a, b){return(moment(b.time).diff(moment(a.time)))})
    } else {
      console.log("sort by count")
      temp.sort(function(a, b){return(b.counter - a.counter)})
    }
    var hidden = this.state.posts.map(x => true);
    var voted = this.state.posts.map(x => false);
    this.setState({posts: temp, hidden: hidden, voted: voted})
    console.log(temp)
  }

  renderPost(post, index) {
    if (post.trigger === undefined || post.trigger === "") {
      return (
        <div style={{ borderBottom: "1px solid #8c8c8c", marginBottom: "10px" }} key={index}>
          <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ color: "#474747" }}>
              {moment(post.time).fromNow()}
            </div>
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
              <Button variant="link" onClick={() => this.onClickVoteHandler(post._id, index)}>I've Been There</Button>
              <div style={{ color: "#474747" }}>
                {post.counter}
              </div>
            </div>
          </div>
          {post.text}
          <div className={"text-button"} style={{ color: "#474747", marginTop: "8px", marginBottom: "16px" }}>
            {post.comments.length} comments
        </div>
        </div>)
    }
    else {
      return (
        ((this.state.hidden[index]) ? (
        <div style={{ flexDirection: "column", paddingBottom: "10px", paddingTop: "4px", borderBottom: "1px solid #8c8c8c", marginBottom: "10px", display: "flex", justifyContent: 'center', alignItems: 'center'}} key={index}>
          <div>
            This post may contain triggering content
          </div>
          <Button variant="link" onClick={() => this.show(index)}>Show post</Button>
        </div>) :
        (<div style={{ borderBottom: "1px solid #8c8c8c", marginBottom: "10px" }} key={index}>
          <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ color: "#474747" }}>
              {moment(post.time).fromNow()}
            </div>
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
              <Button variant="link" onClick={() => this.onClickVoteHandler(post._id, index)}>
                I've Been There
              </Button>
              <div style={{ color: "#474747" }}>
                {post.counter}
              </div>
            </div>
          </div>
          {post.text}
          <div className={"text-button"} style={{ color: "#474747", marginTop: "8px", marginBottom: "16px" }}>
            {post.comments.length} comments
        </div>
        </div>))
      )
    }


  }

  componentDidMount() {
    this.fetchPosts();
  }

  render() {
    return (
      <div style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}>
        <div style={{ width: "65%", textAlign: "flex-start" }}>
          <h1>
            Been There
        </h1>
          We all go through hard times, and sometimes it's nice to simply know that you aren't alone.
          Post your stories of hard times to see similar stories. Warning! There may be triggering content below,
          please read with caution.
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginTop: "14px" }}>
              Sorting by
        <NavDropdown title={this.state.fetchMode === 1 ? "Recent" : "Top"} id="basic-nav-dropdown">
                <NavDropdown.Item onClick={() => this.changeMode(1)}>Recent</NavDropdown.Item>
                <NavDropdown.Item onClick={() => this.changeMode(0)}>Top</NavDropdown.Item>
              </NavDropdown>
            </div>
            <Button variant="outline-primary" onClick={this.onClickPostHandler}>Post your story</Button>
          </div>
          <div style={{ borderBottom: "1px solid #8c8c8c", marginTop: "12px", marginBottom: "12px" }} />
          {this.state.posts.map((post, index) =>
            this.renderPost(post, index))}
        </div>
      </div>
    );
  }
}
export default withRouter(Home);
