import React, { Component } from "react";
import "./Product.css";
import axios from "axios";
import Creatable from "react-select/creatable";

class Product extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    console.log(this.props);
  }

  render() {
    return (
      <div>
        <h1>{this.props._id}</h1>
        <h1>{this.props.name}</h1>
        <h1>{this.props.company}</h1>
        <h1>{this.props.price}</h1>
        <h1>{this.props.tag}</h1>
        <h1>{this.props.route}</h1>
      </div>
    );
  }
}

export default Product;
