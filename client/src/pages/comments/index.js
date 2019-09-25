import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Badge, DropdownButton, NavDropdown, Button, Alert, Form } from 'react-bootstrap';
import { withRouter } from 'react-router';
import moment from 'moment';

class Comments extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            post: {},
            commentText: "",
            voted: false
        };

        this.fetchPostData = this.fetchPostData.bind(this);
        this.comment = this.comment.bind(this);
        this.onChangeTextHandler = this.onChangeTextHandler.bind(this);
    }

    fetchPostData(postId) {
      console.log("fdsfds")
        fetch(`/api/getPost/` + postId)
            .then(result => result.json())
            .then(result => {
                if (result.success) {
                    let temp = result.post;
                    temp.comments = result.post.comments.reverse();
                    this.setState({
                        commentText: "",
                        post: temp
                    })
                    console.log(this.state.commentText)
                }
            }).catch(error => console.log(error));
    }

    onClickVoteHandler(postId, index) {
      if (!this.state.voted) {
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
              let temp = this.state.post
              temp.counter += 1
              this.setState({ post: temp })
            } else {
              // TODO: show error to user
            }
          });
        this.setState({ voted: true })
      }
    }

    componentDidMount() {
        this.fetchPostData(this.props.match.params.post);
    }

    onChangeTextHandler(event) {
        this.setState({
            commentText: event.target.value,
        });
    }

    comment(event) {
        event.preventDefault();
        fetch('http://localhost:5000/api/commentPost', {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                comment: this.state.commentText,
                postId: this.state.post._id
            }),
        }).then(result => result.json())
            .then(result => {
                if (result && result.success) {
                    this.fetchPostData(this.props.match.params.post);
                }
            });
    }

    renderPostCard(post) {
        if (post && post.text) {
            return (
                <div style={{ borderBottom: "1px solid #8c8c8c", marginBottom: "10px" }}>
                    <h1 style={{ cursor: "pointer" }} onClick={() => this.props.history.push(`/`)}>
                        Been There
                </h1>
                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                        <div style={{ color: "#474747" }}>
                            {moment(post.time).fromNow()}
                        </div>
                        <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                            <Button variant="link" onClick={() => this.onClickVoteHandler(post._id)}>I've Been There</Button>
                            <div style={{ color: "#474747" }}>
                                {post.counter}
                            </div>
                        </div>
                    </div>
                    <div style={{ marginBottom: "14px", display: "flex", flexDirection: "row" }}>
                        {post.tags.map((tag, index) =>
                            <div style={{ marginRight: "6px" }}>
                                <Badge variant="secondary">{tag}</Badge>
                            </div>)}
                    </div>
                    {
                        post.text.split('\n').map((item, i) => {
                            return (
                                <p key={i}>{item}</p>
                            );
                        })
                    }

                    <div style={{ color: "#474747", marginTop: "8px", marginBottom: "16px" }}>
                        {post.comments.length} comments
                    </div>
                </div>
            );
        }
    }

    render() {
        return (
            <div style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}>
                <div style={{ width: "65%", textAlign: "flex-start" }}>
                    <div style={{ flex: 0.8, flexDirection: 'row' }}>
                        {this.renderPostCard(this.state.post)}
                    </div>

                    <div>
                        <h3 style={{
                            display: "inline-block",
                            flex: 1,
                            marginBottom: "10px"
                        }}>Comments</h3>
                        <Form
                            onSubmit={(event) => this.comment(event)}>
                            <Form.Group>
                                <Form.Control
                                    style={{ marginBottom: "10px" }}
                                    as="textarea"
                                    rows="3"
                                    onChange={this.onChangeTextHandler}
                                    value={this.state.commentText}
                                    placeholder="Share your stories or words of encouragement here..." />
                                <div style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
                                    <Button disabled={this.state.commentText === ""} variant="primary" type="submit" onClick={(event) => this.comment(event)}>Comment</Button>
                                </div>
                            </Form.Group>
                        </Form>
                        {this.state.post && this.state.post.comments ? this.state.post.comments.map((comment, index) =>
                            <div style={{ marginTop: "10px" }}>
                                {comment}
                            </div>) : null}
                    </div>
                </div>
            </div>
        );
    }
}

export default Comments;
