import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddEmployees from "./components/add-employees.component";
import Employees from "./components/employees.component";
import EmployeesList from "./components/employees-list.component";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/employees" className="navbar-brand">
            Seven-Inc
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/employees"} className="nav-link">
                Employees
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/employees"]} component={EmployeesList} />
            <Route exact path="/add" component={AddEmployees} />
            <Route path="/employees/:id" component={Employees} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
