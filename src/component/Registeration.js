import React, { Component } from "react";
import { Button} from "@material-ui/core";
import "../CssFiles/registration.css";
import FundooLogo from "../Images/account.svg";
import InField from "../component/InField";
import PasswordField from "./PasswordField";
import { typography } from "@material-ui/system";
import { RegisterUser } from "./Service";
class Registeration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
      isValidFname: false,
      isValidLname: false,
      isValidEmail: false,
      isValidPhoneNo: false,
      isValidPassword: false,
      isValidCheckPassword: false,
      FnameError: "",
      LnameError: "",
      emailError: "",
      phoneNoError: "",
      passwordError: "",
      checkPasswordError: "",
      showPassword: true,
      checkPassword: "",
      user: {},
      register: {}
    };
  }
  validateFname = () => {
    if (this.state.firstName !== "") {
      this.setState({
        FnameError: ""
      });
    }
  };

  validateLname = () => {
    if (this.state.lastName !== "") {
      this.setState({
        LnameError: ""
      });
    }
  };

  validateEmail = () => {
    if (this.state.email !== "") {
      this.setState({
        emailError: "Username must contain @"
      });
      if (this.state.email.includes("@")) {
        this.setState({
          emailError: "",
          isValidEmail: true
        });
      }
    }
  };

  validatePhoneno = () => {
    if (this.state.phoneNumber !== "") {
      this.setState({
        phoneNoError: "Phone number must contain 10 numbers"
      });
      if (this.state.phoneNumber.length === 10) {
        this.setState({
          phoneNoError: ""
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
  validateCheckPassword = () => {
    if (this.state.password === this.state.checkPassword) {
      this.setState({
        checkPasswordError: "",
        isValidCheckPassword: true
      });
    }
    if (this.state.password !== this.state.checkPassword) {
      this.setState({
        checkPasswordError: "This field should match password",
        isValidCheckPassword: false
      });
    }
  };
  handleCancel = () => {
    this.props.history.push("/");
  };
  getFirstName = event => {
    this.setState(
      {
        firstName: event.target.value
      },
      () => {
        this.validateFname();
      }
    );
  };
  getLastName = event => {
    this.setState(
      {
        lastName: event.target.value
      },
      () => {
        this.validateLname();
      }
    );
  };
  getEmail = event => {
    this.setState(
      {
        email: event.target.value
      },
      () => {
        this.validateEmail();
      }
    );
  };
  getPhoneNumber = event => {
    this.setState(
      {
        phoneNumber: event.target.value
      },
      () => {
        this.validatePhoneno();
      }
    );
  };

  getPassword = event => {
    this.setState(
      {
        password: event.target.value
      },
      () => {
        this.validatePassword();
      }
    );
  };
  getCheckPassword = event => {
    this.setState(
      {
        checkPassword: event.target.value
      },
      () => {
        this.validateCheckPassword();
      }
    );
  };
  getData = event => {
    if (this.state.firstName === "") {
      this.setState({
        FnameError: "First name can not be Empty!"
      });
      this.validateFname();
    }

    if (this.state.lastName === "") {
      this.setState({
        LnameError: "Last name can not be Empty!"
      });
      this.validateLname();
    }

    if (this.state.email === "") {
      this.setState({
        emailError: "Email can not be Empty!"
      });
      this.validateEmail();
    }

    if (this.state.phoneNumber === "") {
      this.setState({
        phoneNoError: "Phone number can not be Empty!"
      });
      this.validatePhoneno();
    }

    if (this.state.password === "") {
      this.setState({
        passwordError: "password can not be Empty!"
      });
      this.validatePassword();
    }

    if (this.state.checkPassword === "") {
      this.setState({
        checkPasswordError: "checkPassword can not be Empty!"
      });
      this.validateCheckPassword();
    }
    
    let user = this.state.user;
    user.name = this.state.firstName + " " + this.state.lastName;
    user.phoneNo = this.state.phoneNumber;
    user.email = this.state.email;
    user.password = this.state.password;
    user.checkPassword = this.state.checkPassword;

    RegisterUser(user)
      .then(response => {
        alert(`${response.data.message}`);
        this.props.history.push("/");
        console.log(response);
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
                <InField
                  label={"First Name"}
                  handleChange={this.getFirstName}
                />
                <div
                  style={{
                    fontSize: "100%",
                    color: "red",
                    paddingBottom: "5%"
                  }}
                >
                  {this.state.FnameError}
                </div>
              </div>
              <div className="nameTexts">
                <InField label={"Last Name"} handleChange={this.getLastName} />
                <div
                  style={{
                    fontSize: "100%",
                    color: "red",
                    paddingBottom: "5%"
                  }}
                >
                  {this.state.LnameError}
                </div>
              </div>
            </div>

            <div className="email">
              <InField label={"Email"} handleChange={this.getEmail} />
              <div
                style={{ fontSize: "100%", color: "red", paddingBottom: "5%" }}
              >
                {this.state.emailError}
              </div>
            </div>
            <div className="email">
              <InField
                label={"Phone Number"}
                handleChange={this.getPhoneNumber}
              />
              <div
                style={{ fontSize: "100%", color: "red", paddingBottom: "5%" }}
              >
                {this.state.phoneNoError}
              </div>
            </div>

            <div className="row">
              <div className="password">
                <PasswordField
                  label={"Password"}
                  handleChange={this.getPassword}
                />
                <div
                  style={{
                    fontSize: "100%",
                    color: "red",
                    paddingBottom: "5%"
                  }}
                >
                  {this.state.passwordError}
                </div>
              </div>
              <div className="password">
                <PasswordField
                  label={"Confirm"}
                  handleChange={this.getCheckPassword}
                />
                <div
                  style={{
                    fontSize: "100%",
                    color: "red",
                    paddingBottom: "5%"
                  }}
                >
                  {this.state.checkPasswordError}
                </div>
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
          <img src={FundooLogo} width="300px" height="300px" alt={FundooLogo}/>
          <typography>Hey Fundoo user </typography>
        </div>
      </div>
    );
  }
}

export default Registeration;
