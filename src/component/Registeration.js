import React, { Component } from "react";
import { Button, Typography, Link } from "@material-ui/core";
import "../CssFiles/registration.css";
import FundooLogo from "../Images/account.svg";
import InField from "../component/InField";
import PasswordField from "./PasswordField";
import { typography } from "@material-ui/system";
import { RegisterUser } from "./Service";
const username = "Email";
const placeHolder = "Password";
class Registeration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
      showPassword: true,
      checkPassword: "",
      user: {},
      register:{}
    };
  }
  handleCancel = () => {
    this.props.history.push("/");
  };
  getUsername = event => {
    this.setState({
      firstName: event.target.value,
      lastName: event.target.value,
      email: event.target.value,
      phoneNumber: event.target.value,
      password: event.target.value,
      checkPassword: event.target.value
    });
  };
  getPassword = event => {
    this.setState({
      password: event.target.value
    });
  };
  getData = event => {
    alert(`${this.state.password} ${this.state.checkPassword}`);

    let user = this.state.user;
    user.name = this.state.firstName + this.state.lastName;
    user.phoneNo = this.state.phoneNumber;
    user.email = this.state.email;
    user.password = this.state.password;
    user.checkPassword = this.state.checkPassword;

    RegisterUser(user)
      .then(response => {
        console.log(response, "registered successfully");
      })
      .catch(err => {
        console.log("registration fail");
      });
  };
  handleMouseDownPassword = event => {
    event.preventDefault();
  };
  render() {
    return (
      <div className="registerationMain">
        <div className="registeration">
          <div style={{ fontSize: "200%" }}>
            <span style={{ color: "blue" }}>f</span>
            <span style={{ color: "red" }}>u</span>
            <span style={{ color: "orange" }}>n</span>
            <span style={{ color: "blue" }}>d</span>
            <span style={{ color: "green" }}>o</span>
            <span style={{ color: "red" }}>o</span>
          </div>
          <div className="signIn">
            <span style={{ color: "Black" }}>Sign up</span>
          </div>
          <div>
            <div className="row">
              <div className="nameTexts">
                <InField label={"First Name"} handleChange={this.getUsername} />
              </div>
              <div className="nameTexts">
                <InField label={"Last Name"} handleChange={this.getUsername} />
              </div>
            </div>

            <div className="email">
              <InField label={"Email"} handleChange={this.getUsername} />
            </div>
            <div className="email">
              <InField label={"Phone Number"} handleChange={this.getUsername} />
            </div>

            <div className="row">
              <div className="password">
                <PasswordField
                  label={"Password"}
                  handleChange={this.getPassword}
                />
              </div>
              <div className="password">
                <PasswordField
                  label={"Confirm"}
                  handleChange={this.getPassword}
                />
              </div>
            </div>
          </div>

          <div className="buttonAlignment">
            <Button
              variant="contained"
              color="secondary"
              className="leftPadding"
              onClick={this.handleCancel}
            >
              Cancel
            </Button>
            <Button variant="contained" color="primary" onClick={this.getData}>
              Register
            </Button>
          </div>
          <div style={{ paddingTop: "4%" }}>
            <typography>
              <Button
                onClick={this.handleCancel}
                variant="inherit"
                color="primary"
              >
                Already Registered?
              </Button>
            </typography>
          </div>
        </div>
        <div className="logo">
          <img src={FundooLogo} width="300px" height="300px" />
          <typography>Hey Fundoo user </typography>
        </div>
      </div>
    );
  }
}

export default Registeration;
