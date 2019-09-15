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
         _id: "ahjkijhgbhjkix b fsd fdfs fsd fsd sfd sdf sfd sdf sdf sfd  sdff sf f sf fsd  fs fs fsd ",
         value: 20,
         sentiment: 9,
         selected: false,
      }]
    }
  }

  componentDidMount() {
    let data = [{
       _id: "b fsd fdfs fsd fsd sfd sdf sfd sdf sdf sfd  sdff sf f sf fsd  fs fs fsd ",        // unique id (required)
       value: 8,
       sentiment: 9,  // used to determine relative size of bubbles (required)
       selected: false,  // if true will use selectedColor/selectedTextColor for circle/text
    },
    {
       _id: "mo b fsd fdfs fsd fsd sfd sdf sfd sdf sdf sfd  sdff sf f sf fsd  fs fs fsd ",        // unique id (required)
       value: 8,
       sentiment: 9,  // used to determine relative size of bubbles (required)
       selected: false,  // if true will use selectedColor/selectedTextColor for circle/text
    },
    {
       _id: "d b fsd fdfs fsd fsd sfd sdf sfd sdf sdf sfd  sdff sf f sf fsd  fs fs fsd ",        // unique id (required)
       value: 8,
       sentiment: 9,  // used to determine relative size of bubbles (required)
       selected: false,  // if true will use selectedColor/selectedTextColor for circle/text
    },
    {
       _id: "e b fsd fdfs fsd fsd sfd sdf sfd sdf sdf sfd  sdff sf f sf fsd  fs fs fsd ",        // unique id (required)
       value: 8,
       sentiment: 9,  // used to determine relative size of bubbles (required)
       selected: false,  // if true will use selectedColor/selectedTextColor for circle/text
    },
    {
       _id: "f b fsd fdfs fsd fsd sfd sdf sfd sdf sdf sfd  sdff sf f sf fsd  fs fs fsd ",        // unique id (required)
       value: 10,
       sentiment: 9,  // used to determine relative size of bubbles (required)
       selected: false,  // if true will use selectedColor/selectedTextColor for circle/text
    },
    {
       _id: "g b fsd fdfs fsd fsd sfd sdf sfd sdf sdf sfd  sdff sf f sf fsd  fs fs fsd ",        // unique id (required)
       value: 8,
       sentiment: 9,  // used to determine relative size of bubbles (required)
       selected: false,  // if true will use selectedColor/selectedTextColor for circle/text
    },
    {
       _id: "h b fsd fdfs fsd fsd sfd sdf sfd sdf sdf sfd  sdff sf f sf fsd  fs fs fsd ",        // unique id (required)
       value: 8,
       sentiment: 9,  // used to determine relative size of bubbles (required)
       selected: false,  // if true will use selectedColor/selectedTextColor for circle/text
    },
    {
       _id: "i b fsd fdfs fsd fsd sfd sdf sfd sdf sdf sfd  sdff sf f sf fsd  fs fs fsd ",        // unique id (required)
       value: 8,
       sentiment: 9,  // used to determine relative size of bubbles (required)
       selected: false,  // if true will use selectedColor/selectedTextColor for circle/text
    }]

    setTimeout(
    function() {
        this.setState({data: this.state.data.concat(data)});
    }
    .bind(this),
    3000
);
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
