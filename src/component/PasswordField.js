import React, { Component } from "react";
import { TextField, InputAdornment, IconButton } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import "../CssFiles/passwordField.css";
class PasswordField extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // username: "",
      showPassword: true
    };
  }

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };
  render() {
    return (
      <div>
        <TextField
          required
          id="outlined-adornment-password"
          variant="outlined"
          type={this.state.showPassword === false ? "text" : "password"}
          label={this.props.label}
          value={this.state.password}
          onChange={this.props.handleChange}
          className="textBox"
          margin="dense"
          style={{paddingBottom:"5%",width:"100%"}}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="Toggle password visibility"
                  onClick={this.handleClickShowPassword}
                >
                  {this.state.showPassword === false ? (
                    <VisibilityOff />
                  ) : (
                    <Visibility />
                  )}
                </IconButton>
              </InputAdornment>
            )
          }}
        />
      </div>
    );
  }
}

export default PasswordField;
