import React, { Component } from "react";
import { getNotes, addNote } from "./Service";
import "../CssFiles/dashBoard.css";
import NoteService from "./NoteService";
import TakeNote from "./TakeNote";
import TakeNoteWithTitle from "./TakeNoteWithTitle";
import { ClickAwayListener } from "@material-ui/core";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    view: state.view,
    drawerPosition:state.drawerPosition
  };
};
class ShowReminder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
      noteEditer: false,
      title: "",
      description: "",
      newNote: {},
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
        this.getAllNotes();
        console.log(this.state.array);
      });
      this.setState({
        title: "",
        description: ""
      });
    }
  };

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
      <div style={{marginLeft:this.props.drawerPosition?"20%":0}}>
        <div className="takeNoteInDashboard">
          {this.state.noteEditer ? (
            <ClickAwayListener onClickAway={this.handleClickAway}>
              <div
                style={{
                  marginTop: " 8.5em"
                }}
                className="takeNoteOfDashboard"
              >
                <TakeNoteWithTitle
                  title={this.getTitle}
                  description={this.getDescription}
                  handleClickAway={this.handleClickAway}
                />
              </div>
            </ClickAwayListener>
          ) : (
            <div
              style={{
                marginTop: "8.5em"
              }}
              className="takeNoteOfDashboard"
            >
              <TakeNote openEditer={this.handleClick} />
            </div>
          )}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "3%",
            marginLeft: this.props.view ? "15%" : "5%"
          }}
        >
          <div className="noteCards">
            {this.state.array.map((value, index) => (
              <div style={{ padding: 7 }}>
                <NoteService
                  isGrid={this.props.location.state.isGrid}
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

export default connect(mapStateToProps)(ShowReminder);
