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
         sentiment: 1,
         selected: false,
         similar: [],
         dataid: this.props.location.state.id
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
                console.log(mytags)
                for (var k = 0; k < mytags.length; k++) {
                  var mytag = mytags[k].toLowerCase()
                  console.log(mytag + " vs " + tag)
                  if (mytag === tag) {
                    similaritycount += 1
                  }
                }
              }
            }
            if (similaritycount > 0) {
              console.log("WOWO")
              add = add.concat([{_id: post.text, dataid: post._id, value: 7 + (similaritycount*2), sentiment: similaritycount/this.props.location.state.tags.length, selected: false}])
              similaritycount = 0
            }
          }

          setTimeout(
          function() {
              console.log(add)
              if (add.length > 0) {
                this.setState({data: this.state.data.concat(add)});
              }
          }.bind(this), 1000);
        }
      }).catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div style={{height: "800px", width: "100%", padding: "0px", paddingTop: "20px", display: "flex", flexDirection: "row", justifyContent: "center"}}>
      <BubbleChart
        data={this.state.data}
      />
      </div>
    );
  }
}
export default Home;
