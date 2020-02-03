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
      route: "some route"
    };
  }

  handleInputChange(event) {}

  handleSubmit(event) {}

  componentDidMount() {
    async function getData(url) {
      try {
        const response = await axios.get(url);
        return response.data;
      } catch (error) {
        console.error(error);
      }
    }
    getData("http://localhost:5000/products")
      .then(res => {
        console.log(res);
        return res;
      })
      .then(data => {
        this.setState({ data: data, route: this.props.route });
      })
      .then(() => console.log(this.state))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        {this.state.data.map((product, i) => {
          return (
            <Product
              className="product"
              key={i}
              _id={this.state.data[i]._id}
              name={this.state.data[i].name}
              company={this.state.data[i].company}
              price={this.state.data[i].price}
              tag={this.state.data[i].tags}
              route={this.state.route}
            />
          );
        })}
      </div>
    );
  }
}

export default Products;
