import React, { useState, useEffect } from "react";
import "./UpdateForm.css";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Creatable from "react-select/creatable";

const UpdateForm = () => {
  const history = useHistory();

  const paramsArr = history.location.pathname.split("/");
  const id = parseInt(paramsArr[paramsArr.length - 1], 10);

  const [data, setData] = useState({});
  const [optionsCompany, setOptionsCompany] = useState([{}]);
  const [optionsDepartments, setoptionsDepartments] = useState([{}]);

  async function getData(url) {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getData(`http://localhost:5000/products/${id}`)
      .then(res => {
        return res;
      })
      .then(res => {
        setData(res);
      })
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    getData("http://localhost:5000/companys")
      .then(res => {
        let options = [];
        res.forEach(element => {
          options.push({
            target: { name: "company", value: element.name },
            label: element.name
          });
        });
        return options;
      })
      .then(res => {
        setOptionsCompany(res);
      })
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    getData("http://localhost:5000/departments")
      .then(res => {
        let options = [];
        res.forEach(element => {
          options.push({
            target: { name: "tags", value: element.name },
            label: element.name
          });
        });
        return options;
      })
      .then(res => {
        setoptionsDepartments(res);
        console.log(res);
      })
      .then(() => {
        console.log(optionsCompany);
      })
      .catch(err => console.log(err));
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    await axios
      .post("http://localhost:5000/admin/update", {
        _id: data._id,
        name: data.name,
        company: data.companys,
        price: data.price,
        tags: data.departments
      })
      .then(function(response) {
        history.push(`/admin/update`);
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  function handleChange(e) {
    console.log(e.target.value);
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  }
  function handleClick(e) {
    console.log(optionsCompany);
    console.log(data);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={data.name}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          מחיר:
          <input
            type="text"
            name="price"
            value={data.price}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          חברה:
          <Creatable
            options={optionsCompany}
            name="company"
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          מחלקה:
          <Creatable
            options={optionsDepartments}
            name="tags"
            onChange={handleChange}
          />
        </label>
        <br />
        <input type="submit" value="Submit" />
      </form>
      <div onClick={handleClick}>dasljbdsalbadslk</div>
    </div>
  );
};

export default UpdateForm;
