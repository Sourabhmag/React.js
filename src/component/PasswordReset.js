import React, { Component } from "react";
import { Button } from "@material-ui/core";
import PasswordField from "../component/PasswordField";
import "../CssFiles/passwordReset.css";
import { passwordReset } from "./Service";
const password = "Password";
const confirm_password = "Confirm Password";
class PasswordReset extends Component {
  constructor(props) {
    super(props);

    this.state = {
      password: "",
      passwordCheck: "",
      pass: {},
      showPassword: true
    };
  }

  getPassword = event => {
    this.setState({
      password: event.target.value
    });
  };
  getPasswordCheck = event => {
    this.setState({
      passwordCheck: event.target.value
    });
  };
  getData = event => {
    if (this.state.password === "") {
      alert(`Password field can not be null`);
    }
    if (this.state.password !== this.state.passwordCheck) {
      alert(`Entered password is not same`);
    }
    this.state.pass.password = this.state.password;
    this.state.pass.passwordCheck = this.state.passwordCheck;
    passwordReset(this.props.match.params.token, this.state.pass)
      .then(Response => {
        alert(`${Response.data.message}`);
        this.props.history.push("/");
        console.log(Response);
      })
      .catch(err => {
        console.log("registration fail");
      });
  };
  reset = event => {
    //event.preventDefault()
    this.setState({
      password: "",
      passwordCheck: ""
    });
  };
  render() {
    return (
      <div className="passwordResetBox">
        <div className="signIn">
          <span style={{ color: "Black", fontWeight: "bold" }}>
            Password Reset
          </span>
        </div>

        <div>
          <PasswordField label={password} handleChange={this.getPassword} />
          <PasswordField
            label={confirm_password}
            handleChange={this.getPasswordCheck}
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
