import React from "react";
import "./Product.css";
import { useHistory } from "react-router-dom";
import axios from "axios";

const Product = ({ _id, name, company, price, tag, route, value }) => {
  const history = useHistory();

  const handleClick = async () => {
    if (route === "update") {
      history.push(`/admin/update/${_id}`);
    } else if (route === "customers") {
      console.log("customers");
    } else {
      await axios
        .post("http://localhost:5000/admin/delete", {
          _id: _id
        })
        .then(function(response) {
          history.push(`/admin`);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  };

  return (
    <div>
      <h1>{_id}</h1>
      <h1>{name}</h1>
      <h1>{company}</h1>
      <h1>{price}</h1>
      <h1>{tag}</h1>
      <h1>{route}</h1>
      <input type="submit" value={value} onClick={handleClick} />
    </div>
  );
};

export default Product;
