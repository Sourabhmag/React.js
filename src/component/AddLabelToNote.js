import React, { Component } from "react";

export class AddLabelToNote extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  handleChange = name => (event, id) => {
    // this.setState({ [name]: event.target.checked });
  };
  render() {
    return (
      <div>
        <Checkbox
          style={{ padding: 0, color: "gray" }}
          checked={this.props.note}
          onChange={this.handleChange(index.id)}
        />
        <Typography style={{ paddingLeft: 5, fontSize: 15 }}>
          {index.title}
        </Typography>
      </div>
    );
  }
}

export default AddLabelToNote;
