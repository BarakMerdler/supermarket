import React, { Component } from "react";
import "./Nav.css";
import axios from "axios";

class Nav extends Component {
  constructor() {
    super();
    this.state = {
      companys: [],
      departments: []
    };
  }

  componentDidMount() {
    async function getData(url) {
      try {
        const response = await axios.get(url);
        return response.data;
      } catch (error) {
        console.error(error);
      }
    }

    getData("http://localhost:5000/companys")
      .then(async res => {
        let companys = [];
        await res.map(company => {
          companys.push(company.name);
        });
        return companys;
      })
      .then(data => {
        this.setState({ companys: data });
      })
      .catch(err => console.log(err));

    getData("http://localhost:5000/departments")
      .then(async res => {
        let departments = [];
        await res.map(department => {
          departments.push(department.name);
        });
        return departments;
      })
      .then(data => {
        this.setState({ departments: data });
      })
      .catch(err => console.log(err));
  }

  render() {
    let departments = [];
    departments = this.state.departments.map((department, i) => {
      return (
        <div key={i} onClick={this.props.handler} value={department}>
          {department}
        </div>
      );
    });

    const companys = this.state.companys.map((company, i) => {
      return (
        <div key={i} onClick={this.props.handler}>
          {company}
        </div>
      );
    });
    return (
      <div>
        <div className="top-nav">
          <h1>Nav Bar</h1>
        </div>
        <div className="down-nav">
          <div className="company">{companys}</div>
          <div className="tags">{departments}</div>
        </div>
      </div>
    );
  }
}

export default Nav;
