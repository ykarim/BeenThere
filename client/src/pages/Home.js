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
      posts: []
    }

    this.onClickPostHandler = this.onClickPostHandler.bind(this);
  }

  getRes() {
    fetch('/api/getRes')
      .then(res => res.json())
      .then(content => this.setState({ content: content }))
  }

  onClickPostHandler(event) {
    event.preventDefault();

    this.props.history.push('/Post');
  }

  componentDidMount() {
    fetch('http://localhost:5000/api/getPosts')
      .then(result => result.json())
      .then(result => {
        if (result && result.posts) {
          this.setState({
            posts: result.posts
          })
        }
      }).catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}>
        <div style={{ width: "65%", textAlign: "flex-start" }}>
          <h1>
            Been Therefdsafs
        </h1>
          We all go through hard times, and sometimes it's nice to simply know that you aren't alone.
          Post your stories of hard times to see similar stories. Warning! There may be triggering content below,
          please read with caution.
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginTop: "14px" }}>
              Sorting by
        <NavDropdown title={this.state.fetchMode === 1 ? "Recent" : "Top"} id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Recent</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Top</NavDropdown.Item>
              </NavDropdown>
            </div>
            <Button variant="outline-primary" onClick={this.onClickPostHandler}>Post your story</Button>
          </div>
          <div style={{ borderBottom: "1px solid #8c8c8c", marginTop: "12px", marginBottom: "12px" }} />
          {this.state.posts.map((post, index) =>
            <div style={{ borderBottom: "1px solid #8c8c8c", marginBottom: "10px" }} key={index}>
              <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ color: "#474747" }}>
                  {moment(post.time).fromNow()}
                </div>
                <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                  <Button variant="link">I've Been There</Button>
                  <div style={{ color: "#474747" }}>
                    {post.counter}
                  </div>
                </div>
              </div>
              {post.text}
              <div className={"text-button"} style={{ color: "#474747", marginTop: "8px", marginBottom: "16px" }}>
                {post.comments.length} comments
            </div>
            </div>)}
        </div>
      </div>
    );
  }
}
export default withRouter(Home);
