import React from "react";
import { Link } from 'react-router-dom';
import { Badge, DropdownButton, NavDropdown, Button, Form } from 'react-bootstrap';
import { withRouter } from 'react-router';


class PostPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            text: '',
            trigger: '',
            isLoading: false,
            show: false,
        };

        this.onChangeTextHandler = this.onChangeTextHandler.bind(this);
        this.submitPost = this.submitPost.bind(this);
    }

    onChangeTextHandler(event) {
        this.setState({
            text: event.target.value,
        });
    }

    handleDelete (i) {
      const tags = this.state.tags.slice(0)
      tags.splice(i, 1)
      this.setState({ tags })
    }

    handleAddition (tag) {
      const tags = [].concat(this.state.tags, tag)
      this.setState({ tags })
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
                    trigger: this.state.trigger,
                    counter: 0,
                    comments: [],
                },
            }),
        }).then(result => result.json())
            .then(result => {
                if (result && result.success) {
                    if (this.state.show) {
                        this.props.history.push('/Graph');
                    } else {
                        this.props.history.push('/');
                    }
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
                <div style={{ width: "65%" }}>
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
                            }}>Share</h1>

                            <Form.Group>
                                <Form.Control
                                    as="textarea"
                                    rows="3"
                                    onChange={this.onChangeTextHandler}
                                    value={this.state.text}
                                    placeholder="Share your story here..." />
                            </Form.Group>
                            <div style={{ width: "50%" }}>
                                <Form.Group>
                                    <Form.Label>Sensitive (possibly triggering) topics</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Leave blank if none"
                                        onChange={(event) => this.setState({ trigger: event.target.value })}
                                    />
                                </Form.Group>
                            </div>
                            <Form.Group controlId="formBasicCheckbox">
                                <Form.Check
                                    type="checkbox"
                                    label="I would like to see stories like mine"
                                    onChange={(event) => this.setState({ show: event.target.value })}
                                />
                                <sub>
                                    If checked, you may see potentially triggering content after sharing.
                          </sub>
                            </Form.Group>

                            <div style={{
                                flex: 1,
                                display: 'flex',
                                marginTop: "20px"
                                // flexDirection: "row-reverse"
                            }}>
                                <Button variant="primary" type="submit">Share your storys</Button>
                            </div>
                        </div>
                    </Form>
                </div>
            </div >
        );
    }
}

export default withRouter(PostPage);
