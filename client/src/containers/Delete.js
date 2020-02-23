import React, { Component } from "react";
import "./Update.css";
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
        <Products route="delete" />
      </div>
    );
  }
}

export default Update;
