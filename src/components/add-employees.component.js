import React, { Component } from "react";
import EmployeesDataService from "../services/employees.service";

export default class AddEmployees extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeBornDate = this.onChangeBornDate.bind(this);
    this.onChangeSalary = this.onChangeSalary.bind(this);
    this.onChangePosition = this.onChangePosition.bind(this);
    this.saveEmployees = this.saveEmployees.bind(this);
    this.newEmployees = this.newEmployees.bind(this);

    this.state = {
      id: null,
      name: "",
      bornDate: "", 
      salary: "",
      position: "",
      published: false,

      submitted: false
    };
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }

  onChangeBornDate(e) {
    this.setState({
      bornDate: e.target.value
    });
  }

  onChangeSalary(e) {
    this.setState({
      salary: e.target.value
    });
  }

  onChangePosition(e) {
    this.setState({
      position: e.target.value
    });
  }

  saveEmployees() {
    var data = {
      name: this.state.name,
      bornDate: this.state.bornDate,
      salary: this.state.salary,
      position: this.state.position
    };

    EmployeesDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          name: response.data.name,
          bornDate: response.data.bornDate,
          salary: response.data.salary,
          position: response.data.position,
          published: response.data.published,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newEmployees() {
    this.setState({
      id: null,
      name: "",
      bornDate: "",
      salary: "",
      position: "",
      published: false,

      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newEmployees}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                required
                value={this.state.name}
                onChange={this.onChangeName}
                name="name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="bornDate">Born Date</label>
              <input
                type="date"
                className="form-control"
                id="bornDate"
                required
                value={this.state.bornDate}
                onChange={this.onChangeBornDate}
                name="bornDate"
              />
            </div>

            <div className="form-group">
              <label htmlFor="salary">Salary</label>
              <input
                type="number"
                className="form-control"
                id="number"
                required
                value={this.state.number}
                onChange={this.onChangeSalary}
                name="number"
              />
            </div>

            <div className="form-group">
              <label htmlFor="position">Position</label>
              <input
                type="text"
                className="form-control"
                id="position"
                required
                value={this.state.position}
                onChange={this.onChangePosition}
                name="position"
              />
            </div>

            <button onClick={this.saveEmployees} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}
