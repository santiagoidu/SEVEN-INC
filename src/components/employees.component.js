import React, { Component } from "react";
import EmployeesDataService from "../services/employees.service";

export default class Employees extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeBornDate = this.onChangeBornDate.bind(this);
    this.onChangeSalary = this.onChangeSalary.bind(this);
    this.onChangePosition = this.onChangePosition.bind(this);
    this.getEmployees = this.getEmployees.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateEmployees = this.updateEmployees.bind(this);
    this.deleteEmployees = this.deleteEmployees.bind(this);

    this.state = {
      currentEmployees: {
        id: null,
        name: "",
        date: "",
        salary: "",
        position: "",
        published: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getEmployees(this.props.match.params.id);
  }

  onChangeName(e) {
    const name = e.target.value;

    this.setState(function(prevState) {
      return {
        currentEmployees: {
          ...prevState.currentEmployees,
          name: name
        }
      };
    });
  }

  onChangeBornDate(e) {
    const bornDate = e.target.value;
    
    this.setState(prevState => ({
      currentEmployees: {
        ...prevState.currentEmployees,
        bornDate: bornDate
      }
    }));
  }

  onChangeSalary(e) {
    const salary = e.target.value;
    
    this.setState(prevState => ({
      currentEmployees: {
        ...prevState.currentEmployees,
        salary: salary
      }
    }));
  }

  onChangePosition(e) {
    const position = e.target.value;
    
    this.setState(prevState => ({
      currentEmployees: {
        ...prevState.currentEmployees,
        position: position
      }
    }));
  }

  getEmployees(id) {
    EmployeesDataService.get(id)
      .then(response => {
        this.setState({
          currentEmployees: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      id: this.state.currentEmployees.id,
      name: this.state.currentEmployees.name,
      bornDate: this.state.currentEmployees.bornDate,
      salary: this.state.currentEmployees.salary,
      position: this.state.currentEmployees.position,
      published: status
    };

    EmployeesDataService.update(this.state.currentEmployees.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentEmployees: {
            ...prevState.currentEmployees,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateEmployees() {
    EmployeesDataService.update(
      this.state.currentEmployees.id,
      this.state.currentEmployees
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The employees was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteEmployees() {    
    EmployeesDataService.delete(this.state.currentEmployees.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/employees')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentEmployees } = this.state;

    return (
      <div>
        {currentEmployees ? (
          <div className="edit-form">
            <h4>Employees</h4>
            <form>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={currentEmployees.name}
                  onChange={this.onChangeName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="bornDate">Born Date</label>
                <input
                  type="date"
                  className="form-control"
                  id="bornDate"
                  value={currentEmployees.bornDate}
                  onChange={this.onChangeBornDate}
                />
              </div>
              <div className="form-group">
                <label htmlFor="salary">Salary</label>
                <input
                  type="number"
                  className="form-control"
                  id="salary"
                  value={currentEmployees.salary}
                  onChange={this.onChangeSalary}
                />
              </div>
              <div className="form-group">
                <label htmlFor="position">Position</label>
                <input
                  type="text"
                  className="form-control"
                  id="position"
                  value={currentEmployees.position}
                  onChange={this.onChangePosition}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentEmployees.published ? "Published" : "Pending"}
              </div>
            </form>

            {currentEmployees.published ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(true)}
              >
                Publish
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deletemployees}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updatemployees}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a employees...</p>
          </div>
        )}
      </div>
    );
  }
}
