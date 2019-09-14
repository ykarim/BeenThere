import React from "react";
import { Link } from 'react-router-dom';
import { Badge, DropdownButton, NavDropdown, Button, Form } from 'react-bootstrap';

export default class PostPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            text: '',
            isLoading: false,
        };

        this.onChangeTextHandler = this.onChangeTextHandler.bind(this);
    }

    onChangeTextHandler(event) {
        this.setState({
            text: event.target.value,
        });
    }

    submitPost(event) {
        event.preventDefault();


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