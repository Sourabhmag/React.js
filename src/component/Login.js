import React, { Component, preventDefault } from "react";
import { Typography, Button, Link } from "@material-ui/core";
import "../CssFiles/login.css";
import InField from "../component/InField";
import PasswordField from "../component/PasswordField";
const username = "Email";
const placeHolder = "Password";
class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      showPassword: true
    };
  }
  handleRegister=()=>{
    this.props.history.push("/register")
  }

  getUsername = event => {
    this.setState({
      username: event.target.value
    });
  };
  getPassword = event => {
    this.setState({
      password: event.target.value
    });
  };
  getData = event => {
    alert(`${this.state.password} ${this.state.username}`);
  };
  handleMouseDownPassword = event => {
    event.preventDefault();
  };
  render() {
    return (
      <div className="loginBox">
        <div style={{ fontSize: "200%" }}>
          <span style={{ color: "blue" }}>f</span>
          <span style={{ color: "red" }}>u</span>
          <span style={{ color: "orange" }}>n</span>
          <span style={{ color: "blue" }}>d</span>
          <span style={{ color: "green" }}>o</span>
          <span style={{ color: "red" }}>o</span>
        </div>

        <div className="signIn">
          <span style={{ color: "Black" }}>Sign in</span>
        </div>

        <div>
          <div className="username">
            <InField label={username} handleChange={this.getUsername} />
          </div>
          <PasswordField label={placeHolder} handleChange={this.getPassword} />
        </div>

        <div className="buttonAlignment">
          <Button variant="contained" color="primary" onClick={this.getData}>
            Login
          </Button>
          <Button
            variant="contained"
            color="secondary"
            className="leftPadding"
            onClick={this.handleRegister}
          >
            Register
          </Button>
        </div>

        <Typography className="link">
          <Link
            href="link"
            onClick={preventDefault}
            variant="inherit"
            color="primary"
          >
            forgot Password?
          </Link>
        </Typography>
      </div>
    );
  }
}

export default Login;
