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
         _id: this.props.location.state.text,
         value: 20,
         sentiment: 9,
         selected: false,
         similar: []
      }]
    }
  }

  componentDidMount() {
    this.fetchPosts();
  }

  fetchPosts() {
    fetch('http://localhost:5000/api/getPosts')
      .then(result => result.json())
      .then(result => {
        if (result && result.posts) {
          var add = []
          for(var i = 0; i < result.posts.length; i++) {
            var post = result.posts[i]

            var similaritycount = 0
            if (post.tags !== undefined && this.props.location.state.text !== post.text) {
              for (var j = 0; j < post.tags.length; j++) {
                var tag = post.tags[j].toLowerCase()
                var mytags = this.props.location.state.tags
                for (var k = 0; k < mytags.length; k++) {
                  var mytag = mytags[k].toLowerCase()
                  if (mytag === tag) {
                    similaritycount += 1
                  }
                }
              }
            }
            if (similaritycount > 0) {
              console.log("WOWO")
              add = add.concat([{_id: post.text, value: 7 + similaritycount, sentiment: 6, selected: false}])
              similaritycount = 0
            }
          }

          setTimeout(
          function() {
              console.log(add)
              if (add.length > 0) {
                this.setState({data: this.state.data.concat(add)});
              }
          }.bind(this), 3000);
        }
      }).catch(error => {
        console.log(error);
      });
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
