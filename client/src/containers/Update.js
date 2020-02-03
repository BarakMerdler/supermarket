import React, { Component } from "react";
import "./Update.css";
import axios from "axios";
import Creatable from "react-select/creatable";
import Products from "../components/Products";

class Update extends Component {
  constructor() {
    super();
  }

  handleInputChange(event) {}

  handleSubmit(event) {}

  componentDidMount() {}

  render() {
    return (
      <div>
        <Products route="update" />
      </div>
    );
  }
}

export default Update;
