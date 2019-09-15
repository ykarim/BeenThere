import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from './pages/Home'
import Post from './pages/post';
import Graph from './pages/Graph'
import Comments from './pages/comments';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const ReactTags = require('react-tag-autocomplete')

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/Post' component={Post} />
            <Route exact path='/Graph' component={Graph} />
            <Route exact path="/:post" component={Comments} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}
