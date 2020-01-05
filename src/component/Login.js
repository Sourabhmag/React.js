import React, { Component} from "react";
import { Typography, Button} from "@material-ui/core";
import "../CssFiles/login.css";
import InField from "../component/InField";
import PasswordField from "../component/PasswordField";
import { LoginUser } from "./Service";
const username = "Email";
const placeHolder = "Password";
const initialState = {
  username: "",
  password: "",
  usernameError: "",
  passwordError: ""
};
class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      state: initialState,
      username: "",
      password: "",
      usernameError: "",
      passwordError: "",
      isValidUsername: false,
      isValidPassword: false,
      showPassword: true,
      loginData: {},
      error: {}
    };
    this.validatePassword = this.validatePassword.bind(this);
    this.validateUsername = this.validateUsername.bind(this);
  }

  validateUsername = () => {
    if (this.state.username !== "") {
      this.setState({
        usernameError: "Username must contain @"
      });
      if (this.state.username.includes("@")) {
        this.setState({
          usernameError: "",
          isValidUsername: true
        });
      }
    }
  };

  validatePassword = () => {
    if (this.state.password.length < 3 && this.state.password.length > 1) {
      this.setState({
        passwordError: "Password length must greater than 2"
      });
    }
    if (this.state.password.length > 2) {
      this.setState({
        passwordError: "",
        isValidPassword: true
      });
    }
  };
  handleRegister = () => {
    this.props.history.push("/register");
  };
  handleForgotPassword = () => {
    this.props.history.push("/forgotPassword");
  };
  getUsername = event => {
    this.setState({
      username: event.target.value
    });
    this.validateUsername();
  };
  getPassword = event => {
    this.setState({
      password: event.target.value
    });
    this.validatePassword();
  };
  getData = event => {
    if (this.state.username === "") {
      this.setState({
        usernameError: "Username can not be empty"
      });
      this.validateUsername();
    }

    if (this.state.password === "") {
      this.setState({
        passwordError: "Password can not be empty"
      });
      this.validatePassword();
    }

    if (
      this.state.isValidUsername === true &&
      this.state.isValidPassword === true
    ) {
      // console.log("in get data1");
      let loginData = this.state.loginData;
      loginData.username = this.state.username;
      loginData.password = this.state.password;
      this.setState({
        username:null,
        password:null
      });
      LoginUser(loginData).then(Response => {
        // console.log(Response);

        alert(`${Response.data.message}`);
        console.log(JSON.stringify(Response.data.data));
        console.log(Response.data.data);

        localStorage.setItem("name", Response.data.data.user.name);
        localStorage.setItem("email", Response.data.data.user.email);
        localStorage.setItem("profilePic", Response.data.data.user.profilePic);
        localStorage.setItem("Token", Response.data.data.token);
        this.props.history.push("/dashboard/note");
      }).catch((err)=>{
        console.log('login failed',err);
        
      })
    }
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
            <div
              style={{
                fontSize: "90%",
                paddingRight: "40%",
                color: "red",
                paddingBottom: "5%"
              }}
            >
              {this.state.usernameError}
            </div>
          </div>

          <PasswordField label={placeHolder} handleChange={this.getPassword} />
          <div
            style={{
              fontSize: "90%",
              paddingRight: "42%",
              color: "red",
              paddingBottom: "5%"
            }}
          >
            {this.state.passwordError}
          </div>
        </div>

        <div className="buttonAlignment">
          <Button
            variant="contained"
            color="secondary"
            className="leftPadding"
            onClick={this.handleRegister}
          >
            Register
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={this.getData}
            style={{ width: "38%" }}
          >
            Login
          </Button>
        </div>

        <Typography className="link">
          <Button
            onClick={this.handleForgotPassword}
            variant="inherit"
            color="primary"
          >
            forgot Password?
          </Button>
        </Typography>
      </div>
    );
  }
}

export default Login;
