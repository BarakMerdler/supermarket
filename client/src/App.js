import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Admin from "./components/Admin";
import Products from "./components/Products";
import Nav from "./components/Nav";

class App extends Component {
  constructor() {
    super();
    this.state = {};
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(e) {
    console.log(e.currentTarget.textContent);
  }
  componentDidMount() {}

  render() {
    return (
      <Router>
        <Nav handler={this.handleClick} />
        <Switch>
          <Route exact path="/">
            <Products route="customers" />
          </Route>
          <Route path="/admin">
            <Admin />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
