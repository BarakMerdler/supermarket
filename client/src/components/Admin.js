import React, { Component } from "react";
import "./Admin.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Add from "../containers/Add.js";
import Update from "../containers/Update";
import UpdateForm from "./UpdateForm";
import Delete from "../containers/Delete";

class Admin extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/admin/update">עדכון מוצרים</Link>
            </li>
            <li>
              <Link to="/admin/delete">מחק מוצר</Link>
            </li>
            <li>
              <Link to="/admin/add">הוסף מוצר</Link>
            </li>
          </ul>
        </div>
        <Switch>
          <Route exact path="/admin">
            <h1>Barak</h1>
          </Route>
          <Route exact path="/admin/update">
            <Update />
          </Route>
          <Route path="/admin/update/:id">
            <UpdateForm />
          </Route>
          <Route path="/admin/delete">
            <Delete />
          </Route>
          <Route path="/admin/add">
            <Add />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default Admin;
