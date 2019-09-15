import React from "react";
import { Link } from 'react-router-dom';
import { Badge, DropdownButton, NavDropdown, Button, Form } from 'react-bootstrap';
import { withRouter } from 'react-router';

class PostPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            text: '',
            isLoading: false,
        };

        this.onChangeTextHandler = this.onChangeTextHandler.bind(this);
        this.submitPost = this.submitPost.bind(this);
    }

    onChangeTextHandler(event) {
        this.setState({
            text: event.target.value,
        });
    }

    submitPost(event) {
        event.preventDefault();

        fetch('http://localhost:5000/api/submitPost', {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                postContent: {
                    text: this.state.text,
                    time: new Date().toString(),
                    counter: 0,
                    comments: [],
                },
            }),
        }).then(result => result.json())
            .then(result => {
                if (result && result.success) {
                    this.props.history.push('/Graph');
                } else {
                    //TODO: show user error
                }
            });
    }

    render() {
        return (
            <div style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "30px",
                flex: 1,
            }}>
                <Form onSubmit={this.submitPost} style={{
                    display: "flex",
                    flex: 0.8,
                }}>
                    <div style={{
                        flex: 1,
                    }}>
                        <h1 style={{
                            display: "inline-block",
                            flex: 1,
                        }}>Post</h1>
                        <div style={{marginBottom: "16px"}}>
                          Please flag your post if it contains triggering content
                        </div>
                        <Form.Group>
                            <Form.Control as="textarea" rows="3" onChange={this.onChangeTextHandler} value={this.state.text} />
                        </Form.Group>

                        <div style={{
                            flex: 1,
                            display: 'flex',
                            flexDirection: "row-reverse"
                        }}>
                            <Button variant="primary" type="submit">Submit</Button>
                        </div>
                    </div>
                </Form>
            </div >
        );
    }
}

export default withRouter(PostPage);
