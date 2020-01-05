import React, { Component } from "react";
import { TextField } from "@material-ui/core";
import "../CssFiles/inField.css";
class InField extends Component {
  render() {
    return (
      <div className="inField">
        <TextField
          required
          id="outlined-basic"
          label={this.props.label}
          variant="outlined"
          type="text"
          margin="dense"
          onChange={this.props.handleChange}
          
        />
      </div>
    );
  }
}

export default InField;
