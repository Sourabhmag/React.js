import React, { Component } from "react";
import NoteService from "./NoteService";
import { getNotes } from "./Service";

class Archive extends Component {
  constructor(props) {
    super(props);

    this.state = {
      array: []
    };
  }

  getAllNotes = () => {
    getNotes(localStorage.getItem("Token")).then(Response => {
      let archiveArray = Response.data.data.filter(
        note => note.archive === true && note.trash !== true
      );
      this.setState({
        array: archiveArray
      });
    });
  };

  UNSAFE_componentWillMount() {
    this.getAllNotes();
  }
  handleRefresh = () => {
    console.log("Call to handleRefresh");

    this.getAllNotes();
  };
  render() {
    return (
      <div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div className="noteCards">
            {this.state.array.map((value, index) => (
              <div style={{ padding: 7 }}>
                <NoteService
                  note={this.state.array[index]}
                  handleRefresh={this.handleRefresh}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Archive;
