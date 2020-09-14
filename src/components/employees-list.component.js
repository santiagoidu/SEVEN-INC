import React, { Component } from "react";
import EmployeesDataService from "../services/employees.service";
import { Link } from "react-router-dom";

export default class EmployeesList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveEmployees = this.retrieveEmployees.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveEmployees = this.setActiveEmployees.bind(this);
    this.removeAllEmployees = this.removeAllEmployees.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      employees: [],
      currentEmployees: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }

  componentDidMount() {
    this.retrieveEmployees();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  retrieveEmployees() {
    EmployeesDataService.getAll()
      .then(response => {
        this.setState({
          employees: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveEmployees();
    this.setState({
      currentEmployees: null,
      currentIndex: -1
    });
  }

  setActiveEmployees(employees, index) {
    this.setState({
      currentEmployees: employees,
      currentIndex: index
    });
  }

  removeAllEmployees() {
    EmployeesDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchTitle() {
    EmployeesDataService.findByTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          employees: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchTitle, employees, currentEmployees, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchTitle}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Employees List</h4>

          <ul className="list-group">
            {employees &&
              employees.map((employees, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveEmployees (employees, index)}
                  key={index}
                >
                  {employees.title}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllemployees}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentEmployees ? (
            <div>
              <h4>Employees</h4>
              <div>
                <label>
                  <strong>Title:</strong>
                </label>{" "}
                {currentEmployees.title}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentEmployees.description}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentEmployees.published ? "Published" : "Pending"}
              </div>

              <Link
                to={"/employees/" + currentEmployees.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Employees...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
