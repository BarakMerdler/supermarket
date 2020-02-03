import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Admin from "./components/Admin";
import Products from "./components/Products";

class App extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <Router>
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
