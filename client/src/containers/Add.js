import React, { Component } from "react";
import "./Add.css";
import axios from "axios";
import Creatable from "react-select/creatable";

class Add extends Component {
  constructor() {
    super();
    this.state = {
      companys: {},
      departments: {},
      optionsCompany: [{}],
      optionsDepartments: [{}],
      name: {},
      price: {}
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleCompanysChange = this.handleCompanysChange.bind(this);
    this.handleDepartmentsChange = this.handleDepartmentsChange.bind(this);
  }
  handleCompanysChange(event) {
    const value = event.label;

    this.setState({
      companys: value
    });
  }
  handleDepartmentsChange(event) {
    const value = event.label;

    this.setState({
      departments: value
    });
  }
  handleInputChange(event) {
    let value;
    const target = event.target;
    if (target.name === "price") {
      value = parseFloat(target.value);
      if (isNaN(value)) {
        window.alert("בבקשה תכניס רק מספר");
        target.value = "";
      }
    } else {
      value = target.value;
    }
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    console.log(this.state);
    axios
      .post("http://localhost:5000/admin/add", {
        name: this.state.name,
        company: this.state.companys,
        price: this.state.price,
        tags: this.state.departments
      })
      .then(function(response) {
        console.log(response);
        window.alert(`המוצר ${this.set.companys} נוצר בהצלחה`);
      })
      .then(event.submit())
      .catch(function(error) {
        console.log(error);
      });
    event.preventDefault();
  }

  componentDidMount() {
    async function getData(url) {
      try {
        const response = await axios.get(url);
        return response;
      } catch (error) {
        console.error(error);
      }
    }
    getData("http://localhost:5000/companys")
      .then(res => {
        let options = [];
        res.data.forEach(element => {
          options.push({
            value: "companys",
            label: element.name,
            target: "options"
          });
        });
        return options;
      })
      .then(res => {
        this.setState({ optionsCompany: res });
      })
      .catch(err => console.log(err));

    getData("http://localhost:5000/departments")
      .then(res => {
        let options = [];
        res.data.forEach(element => {
          options.push({
            value: "departments",
            label: element.name,
            target: "options"
          });
        });
        return options;
      })
      .then(res => {
        this.setState({ optionsDepartments: res });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            שם מוצר:
            <input type="text" name="name" onChange={this.handleInputChange} />
          </label>
          <br />
          <label>
            מחיר:
            <input type="text" name="price" onChange={this.handleInputChange} />
          </label>
          <br />
          <label>
            חברה:
            <Creatable
              options={this.state.optionsCompany}
              name="company"
              onChange={this.handleCompanysChange}
            />
          </label>
          <br />
          <label>
            מחלקה:
            <Creatable
              options={this.state.optionsDepartments}
              name="tags"
              onChange={this.handleDepartmentsChange}
            />
          </label>
          <br />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default Add;
