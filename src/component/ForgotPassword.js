import React, { Component } from "react";
import { Paper, Button } from "@material-ui/core";
import "../CssFiles/forgotPassword.css";
import InField from "./InField";
const username = "Email";
class ForgotPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: ""
    };
  }
  getData = event => {
    alert(` ${this.state.username}`);
  };

  getUsername = event => {
    this.setState({
      username: event.target.value
    });
  };
  render() {
    return (
      <div className="forgotBox">
        <h2>Forgot Password</h2>

        <div>
          <InField label={username} handleChange={this.getUsername} />
        </div>
        <div className="buttonAlignment">
          <Button variant="contained" color="primary" onClick={this.getData}>
            Submit
          </Button>
          <Button
            variant="contained"
            color="secondary"
            className="leftPadding"
            onClick
          >
            Cancel
          </Button>
        </div>
      </div>
    );
  }
}

export default ForgotPassword;
