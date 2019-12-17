import React, { Component } from "react";
import { Button } from "@material-ui/core";
import PasswordField from "../component/PasswordField";
import "../CssFiles/passwordReset.css";
const password = "Password";
const confirm_password = "Confirm Password";
class PasswordReset extends Component {
  constructor(props) {
    super(props);

    this.state = {
      password: "",
      confirmPassword: "",
      showPassword: true
    };
  }
  getPassword = event => {
    this.setState({
      password: event.target.value
    });
  };
  getConfirmPassword = event => {
    this.setState({
      confirmPassword: event.target.value
    });
  };
  getData = event => {
    if (this.state.password === "") {
      alert(`Password field can not be null`);
    }
    this.state.password === this.state.confirmPassword
      ? alert(`${this.state.password} ${this.state.confirmPassword}`)
      : alert(`Entered password is not same`);
  };
  reset = event => {
    //event.preventDefault()
    let resetField = {};
    this.setState({
      password: "",
      confirmPassword: ""
    });
  };
  render() {
    return (
      <div className="passwordResetBox">
        <div className="signIn">
          <span style={{ color: "Black", fontWeight: "bold"}}>
            Password Reset
          </span>
        </div>

        <div>
          <PasswordField
            label={password}
            handleChange={this.getPassword}
            
          />
          <PasswordField
            label={confirm_password}
            handleChange={this.getConfirmPassword}
          />
        </div>

        <div className="buttonAlignment">
          <Button
            variant="contained"
            color="secondary"
            className="leftPadding"
            onClick={this.reset}
          >
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={this.getData}>
            Submit
          </Button>
        </div>
      </div>
    );
  }
}

export default PasswordReset;
