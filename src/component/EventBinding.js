import React, { Component } from "react";

class EventBinding extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: "Hello"
    };
    this.clickHandler = this.clickHandler.bind(this);
  }
  clickHandler() {
    this.setState({
      message: "Goodbye!"
    });
    console.log(this.state.message);
  }
  render() {
    console.log(this.state.message);

    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column"
        }}
      >
        <div>{this.state.message}</div>
        {/* <button onClick={this.clickHandler.bind(this)}>click</button> */}
        {/* <button onClick={() => this.clickHandler()}>click</button>  */}
        <button onClick={this.clickHandler}>click</button>
      </div>
    );
  }
}

export default EventBinding;
