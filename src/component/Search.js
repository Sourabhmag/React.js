import React, { Component } from "react";
import { getNotes, search } from "./Service";
import NoteService from "./NoteService";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    view: state.view,
    drawerPosition: state.drawerPosition,
    reminder: state.reminder
  };
};
class Search extends Component {
  constructor(props) {
    super(props);

    this.state = { array: [] };
  }
  componentDidMount() {
    console.log(this.props.location.state.searchArray);

    this.setState({
      array: this.props.location.state.searchArray
    });
  }
  render() {
    console.log(this.state.array);

    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "8%",
          marginLeft: this.props.drawerPosition ? "25%" : 0,
          transition: "margin .20s linear"
        }}
      >
        <div className="noteCards">
          {this.props.location.state.searchArray.map((value, index) => (
            <div style={{ padding: 7 }}>
              <NoteService
                isGrid={this.props.location.state.isGrid}
                note={this.props.location.state.searchArray[index]}
                array={this.props.location.state.searchArray}
                handleRefresh={this.handleRefresh}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Search);
