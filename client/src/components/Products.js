import React, { Component } from "react";
import "./Products.css";
import axios from "axios";
import Creatable from "react-select/creatable";
import Product from "./Product";

class Products extends Component {
  constructor() {
    super();
    this.state = {
      data: [
        {
          _id: "0",
          name: "name product",
          compamy: "name company",
          price: "price",
          tags: "demprtment"
        }
      ],
      route: "some route",
      value: "some value",
      hasError: false
    };
  }

  handleInputChange(event) {}

  componentDidMount() {
    async function getData(url) {
      try {
        const response = await axios.get(url);
        return response.data;
      } catch (error) {
        console.error(error);
      }
    }
    function setValue(route) {
      let value = "";
      if (route === "update") {
        value = "עדכן מוצר";
      } else if (route === "customers") {
        value = "הוסף לסל";
      } else {
        value = "מחק מוצר";
      }
      return value;
    }
    getData("http://localhost:5000/products")
      .then(res => {
        return res;
      })
      .then(data => {
        const route = this.props.route;
        const value = setValue(route);
        this.setState({ data: data, route: route, value: value });
      })
      .catch(err => console.log(err));
  }
  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });
    // You can also log the error to an error reporting service
    console.log(error, info);
  }

  render() {
    return (
      <div>
        {this.state.data.map((product, i) => {
          return (
            <Product
              className="product"
              key={i}
              _id={product._id}
              name={this.state.data[i].name}
              company={this.state.data[i].company}
              price={this.state.data[i].price}
              tag={this.state.data[i].tags}
              route={this.state.route}
              value={this.state.value}
            />
          );
        })}
      </div>
    );
  }
}

export default Products;
