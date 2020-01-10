import React, { Component } from "react";
import { getNotes } from "./Service";
import "../CssFiles/dashBoard.css";
import NoteService from "./NoteService";

class ShowReminder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      array: []
    };
  }
  handleRefresh = () => {
    this.getAllNotes();
  };
  getAllNotes = () => {
    getNotes(localStorage.getItem("Token")).then(Response => {
      let rawArray = Response.data.data;
      let reminderArray = rawArray.filter(
        note => note.reminder !== null && note.reminder !== undefined
      );
      this.setState({
        array: reminderArray
      });
    });
  };

  UNSAFE_componentWillMount() {
    this.getAllNotes();
  }
  render() {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className="noteCards">
          {this.state.array.map((value, index) => (
            <div style={{ padding: 7 }}>
              <NoteService
                note={this.state.array[index]}
                array={this.state.array}
                handleRefresh={this.handleRefresh}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default ShowReminder;
