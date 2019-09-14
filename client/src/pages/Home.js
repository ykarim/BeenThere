import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Badge, DropdownButton, NavDropdown, Button } from 'react-bootstrap';

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      content: "",
      fetchMode: 1,
      posts: [{text: "fdsfds", time: new Date()}]
    }
  }

  getRes() {
    fetch('/api/getRes')
    .then(res => res.json())
    .then(content => this.setState({ content: content }))
  }

  render() {
    return (
    <div style={{display: "flex", justifyContent: "center", marginTop: "30px"}}>
      <div style={{width: "65%", textAlign: "flex-start"}}>
        <h1>
          Been There
        </h1>
          We all go through hard times, and sometimes it's nice to simply know that you aren't alone.
          Post your stories of hard times to see similar stories and get affirmation that you really
          arent alone.
        <div style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%"}}>
        <div style={{display: "flex", flexDirection: "row", alignItems: "center", marginTop: "14px"}}>
        Sorting by
        <NavDropdown title={this.state.fetchMode === 1 ? "Recent" : "Top"} id="basic-nav-dropdown">
          <NavDropdown.Item href="#action/3.1">Recent</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">Top</NavDropdown.Item>
        </NavDropdown>
        </div>
        <Button variant="outline-primary">Post your story</Button>
        </div>
        {this.state.content}
      </div>
    </div>
    );
  }
}
export default Home;
