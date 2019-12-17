import React, { Component } from "react";
import { TextField } from "@material-ui/core";
// import "../CssFiles/login.css";
// import "../CssFiles/inField.css";
import "../CssFiles/inField.css";
class InField extends Component {
  constructor(props) {
    super(props);
  }
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
          style={{paddingBottom:"5%"}}
        />
      </div>
    );
  }
}

export default InField;
