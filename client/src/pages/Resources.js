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
          <h1 style={{cursor: "pointer"}} onClick={() => this.props.history.push(`/`)}>
            Resources
          </h1>
          Please check out the resources below if you are experiencing any of the issues below.

        <h4 style={{marginTop: "20px"}}>
          Suicide
        </h4>
        <a href="https://suicidepreventionlifeline.org">Suicide Prevention Lifeline</a>
        <a href="https://www.sprc.org">Suicide Prevention Resources Center</a>
        <a href="https://www.translifeline.org/">Trans Lifeline</a>

        <h4 style={{marginTop: "20px"}}>
          Depression
        </h4>
        <a href="https://www.mhanational.org/depression-support-and-advocacy">Mental Health America</a>
        <a href="https://nndc.org/resource-links/">National Network of Depression Centers</a>
        <a href="https://adaa.org/living-with-anxiety/ask-and-learn/resources/">AADA</a>

        <h4 style={{marginTop: "20px"}}>
          Substance Abuse
        </h4>
        <a href="https://www.samhsa.gov/find-help/national-helpline">National Helpline</a>
        <a href="https://www.drugabuse.gov/publications/principles-drug-addiction-treatment-research-based-guide-third-edition/resources">DrugAbuse.gov</a>
        <a href="https://www.addictioncenter.com/community-resources/">Addiction Center</a>

        <h4 style={{marginTop: "20px"}}>
          Anxiety
        </h4>
        <a href="https://www.everydayhealth.com/anxiety/guide/resources/">Anxiety Resources</a>
        <a href="https://www.rtor.org/anxiety/">RTOR</a>

      </div>
      </div>
    );
  }
}
export default (Resources);
