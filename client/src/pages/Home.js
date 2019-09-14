import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      content: ""
    }
  }

  getRes() {
    fetch('/api/getRes')
    .then(res => res.json())
    .then(content => this.setState({ content: content }))
  }

  componentDidMount() {
    this.getRes();
  }

  render() {
    return (
    <div style={{display: "flex", justifyContent: "center"}}>
      <div style={{width: "50%", textAlign: "center"}}>
        <h1>
        React Boilerplate
        </h1>
        {this.state.content}
      </div>
    </div>
    );
  }
}
export default Home;
