import React, { Component } from "react";
import { Button } from "@material-ui/core";
import "../CssFiles/forgotPassword.css";
import InField from "./InField";
import { forgotPassword } from "./Service";
const username = "Email";
class ForgotPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: ""
    };
  }
  handleCancel = () => {
    this.props.history.push("/");
  };
  getData = event => {
    forgotPassword(this.state.username)
      .then(Response => {
        console.log(Response);

        alert(`${Response.data.message}`);
        this.props.history.push("/");
      })
      .catch(err => {
        console.log(`failed`);
      });
  };

  getUsername = event => {
    this.setState({
      username: event.target.value
    });
  };
  render() {
    return (
      <div className="mainforgotBox">
        <div className="forgotBox">
          <h2>Forgot Password</h2>

          <div>
            <InField label={username} handleChange={this.getUsername} />
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
              Submit
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default ForgotPassword;
