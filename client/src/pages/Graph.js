import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Badge, DropdownButton, NavDropdown, Button } from 'react-bootstrap';
import BubbleChart from '../components/BubbleChart';
var moment = require('moment');

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [{
         _id: "ahjkijhgbhjkix",        // unique id (required)
         value: 1,
         sentiment: 9,  // used to determine relative size of bubbles (required)
         selected: false,  // if true will use selectedColor/selectedTextColor for circle/text
      },
      {
         _id: "b",        // unique id (required)
         value: 2,
         sentiment: 9,  // used to determine relative size of bubbles (required)
         selected: false,  // if true will use selectedColor/selectedTextColor for circle/text
      },
      {
         _id: "c",        // unique id (required)
         value: 3,
         sentiment: 9,  // used to determine relative size of bubbles (required)
         selected: false,  // if true will use selectedColor/selectedTextColor for circle/text
      },
      {
         _id: "d",        // unique id (required)
         value: 4,
         sentiment: 9,  // used to determine relative size of bubbles (required)
         selected: false,  // if true will use selectedColor/selectedTextColor for circle/text
      },
      {
         _id: "e",        // unique id (required)
         value: 8,
         sentiment: 9,  // used to determine relative size of bubbles (required)
         selected: false,  // if true will use selectedColor/selectedTextColor for circle/text
      },
      {
         _id: "f",        // unique id (required)
         value: 200,
         sentiment: 9,  // used to determine relative size of bubbles (required)
         selected: false,  // if true will use selectedColor/selectedTextColor for circle/text
      },
      {
         _id: "g",        // unique id (required)
         value: 8,
         sentiment: 9,  // used to determine relative size of bubbles (required)
         selected: false,  // if true will use selectedColor/selectedTextColor for circle/text
      },
      {
         _id: "h",        // unique id (required)
         value: 8,
         sentiment: 9,  // used to determine relative size of bubbles (required)
         selected: false,  // if true will use selectedColor/selectedTextColor for circle/text
      },
      {
         _id: "i",        // unique id (required)
         value: 8,
         sentiment: 9,  // used to determine relative size of bubbles (required)
         selected: false,  // if true will use selectedColor/selectedTextColor for circle/text
      }]
    }
  }

  render() {
    return (
    <body>
      <div style={{height: "800px", width: "100%", padding: "0px", display: "flex", flexDirection: "row", justifyContent: "center"}}>
      <BubbleChart
        data={this.state.data}
      />
      </div>
    </body>
    );
  }
}
export default Home;
