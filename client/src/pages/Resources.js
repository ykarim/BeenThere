import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Badge, DropdownButton, NavDropdown, Button } from 'react-bootstrap';
import { withRouter } from 'react-router';

var moment = require('moment');

class Resources extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }

  }

  render() {
    return (
      <div style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}>
        <div style={{ width: "65%", textAlign: "flex-start", display: "flex", flexDirection: "column", justifyContent: "flex-start"}}>
          <h1>
            Resources
        </h1>
          Please check out the resources below if you are experiencing any kind
          of serious issue.
        <a href="https://suicidepreventionlifeline.org">Link</a>

      </div>
      </div>
    );
  }
}
export default (Resources);
