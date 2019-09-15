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
        };

        this.fetchPostData = this.fetchPostData.bind(this);
    }

    fetchPostData(postId) {
        fetch('http://localhost:5000/api/getPost/' + postId)
            .then(result => result.json())
            .then(result => {
                if (result.success) {
                    this.setState({
                        post: result.post
                    })
                }
            }).catch(error => console.log(error));
    }

    componentDidMount() {
        this.fetchPostData(this.props.match.params.post);
    }

    renderPostCard(post) {
        if (post && post.text) {
            return (
                <div style={{ borderBottom: "1px solid #8c8c8c", marginBottom: "10px" }}>
                <h1 style={{cursor: "pointer"}} onClick={() => this.props.history.push(`/`)}>
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
                    <div style={{marginBottom: "14px", display: "flex", flexDirection: "row"}}>
                    {post.tags.map((tag, index) =>
                      <div style={{marginRight: "6px"}}>
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

                    <Form.Group>
                        <Form.Control
                            as="textarea"
                            rows="3"
                            onChange={this.onChangeTextHandler}
                            value={this.state.text}
                            placeholder="Share your stories or words of encouragement here..." />
                    </Form.Group>
                </div>
            </div>
          </div>
        );
    }
}

export default Comments;
