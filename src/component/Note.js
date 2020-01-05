import React, { Component } from "react";
import { addNote, getNotes } from "./Service";
import { ClickAwayListener } from "@material-ui/core";
import TakeNote from "./TakeNote";
import TakeNoteWithTitle from "./TakeNoteWithTitle";
import NoteService from "./NoteService";
import "../CssFiles/dashBoard.css";
export class Note extends Component {
  constructor(props) {
    super(props);

    this.state = {
      noteEditer: false,
      title: "",
      description: "",
      newNote: {},
      array: []
    };
  }
  getTitle = event => {
    this.setState(
      {
        title: event.target.value
      },
      () => {
        console.log(this.state.title);
      }
    );
  };

  getDescription = event => {
    this.setState({
      description: event.target.value
    });
    console.log(this.state.description);
  };
  getAllNotes = () => {
    console.log("in getAllNotes");

    getNotes(localStorage.getItem("Token")).then(Response => {
      console.log(Response.data.data);
      console.log(Response.data)
      let trashArray = Response.data.data.filter(
        note => note.trash === false && note.archive === false
      );
      this.setState({
        array: trashArray
      });
    });
  };

  UNSAFE_componentWillMount() {
    this.getAllNotes();
  }
  handleClick = async () => {
    console.log(this.state.noteEditer);
    await this.setState({ noteEditer: true });
  };

  handleClickAway = () => {
    console.log(this.state.noteEditer);
    this.setState({ noteEditer: false });
    if (this.state.title !== "" || this.state.description !== "") {
      let newNote = this.state.newNote;
      let token = localStorage.getItem("Token");
      newNote.title = this.state.title;
      newNote.description = this.state.description;
      addNote(newNote, token).then(Response => {
        this.setState({
          array: Response.data.data
        });
        console.log(this.state.array);
      });
      this.setState({
        title: "",
        description: ""
      });
    }
  };
  handleRefresh = () => {
    console.log("Call to handleRefresh");

    this.getAllNotes();
  };
  render() {
    console.log(this.props);

    return (
      <div>
        <div className="takeNoteInDashboard">
          {this.state.noteEditer ? (
            <ClickAwayListener onClickAway={this.handleClickAway}>
              <div className="takeNoteOfDashboard">
                <TakeNoteWithTitle
                  title={this.getTitle}
                  description={this.getDescription}
                  handleClickAway={this.handleClickAway}
                />
              </div>
            </ClickAwayListener>
          ) : (
            <div className="takeNoteOfDashboard">
              <TakeNote
                // openEditer={() => this.setState({ noteEditer: true })}
                openEditer={this.handleClick}
              />
            </div>
          )}
        </div>
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
      </div>
    );
  }
}

export default Note;
