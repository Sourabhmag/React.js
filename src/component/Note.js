import React, { Component } from "react";
import { addNote, getNotes } from "./Service";
import { ClickAwayListener, Typography } from "@material-ui/core";
import TakeNote from "./TakeNote";
import TakeNoteWithTitle from "./TakeNoteWithTitle";
import NoteService from "./NoteService";
import "../CssFiles/dashBoard.css";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    view: state.view,
    drawerPosition: state.drawerPosition,
    reminder: state.reminder
  };
};
export class Note extends Component {
  constructor(props) {
    super(props);

    this.state = {
      noteEditer: false,
      title: "",
      description: "",
      colaborators: [],
      pin: false,
      color: "",
      archive: false,
      reminder: "",
      labelList: [],
      newNote: {},
      array: [],
      pinArray: [],
      isAnyPinned: false,
      isGrid: false
    };
  }
  getTitle = event => {
    this.setState({
      title: event.target.value
    });
  };

  getDescription = event => {
    this.setState({
      description: event.target.value
    });
  };

  setArrays = (trashArray, pinArray) => {
    this.setState({
      array: trashArray,
      pinArray: pinArray
    });
  };
  getAllNotes = () => {
    getNotes(localStorage.getItem("Token")).then(Response => {
      let trashArray = Response.data.data.filter(
        note =>
          note.trash === false && note.archive === false && note.pin === false
      );
      let pinArray = Response.data.data.filter(
        note =>
          note.trash === false && note.archive === false && note.pin === true
      );

      this.setArrays(trashArray, pinArray);

      if (this.state.pinArray.length === 0) {
        this.setState({
          isAnyPinned: false
        });
      } else {
        this.setState({
          isAnyPinned: true
        });
      }
    });
  };

  componentDidMount() {
    this.getAllNotes();
  }
  handleClick = async () => {
    await this.setState({ noteEditer: true });
  };

  handleClickAway = (
    pin,
    color,
    colaborator,
    archive,
    reminder,
    labelArray
  ) => {
    this.setState({ noteEditer: false });

    if (this.state.title !== "" || this.state.description !== "") {
      let newNote = this.state.newNote;
      let token = localStorage.getItem("Token");
      newNote.title = this.state.title;
      newNote.description = this.state.description;
      newNote.pin = pin;
      newNote.color = color;
      newNote.colaborators = colaborator;
      newNote.archive = archive;
      newNote.reminder = reminder;
      newNote.labelList = labelArray;
      addNote(newNote, token).then(Response => {
        console.log(Response.data);

        this.setState({
          array: Response.data.data
        });
      });
      this.setState({
        title: "",
        description: "",
        colaborators: null,
        pin: false,
        color: "",
        archive: false,
        reminder: ""
      });
      this.handleRefresh();
    }
  };
  handleRefresh = () => {
    console.log("in handleRefresh");

    this.getAllNotes();
  };
  render() {
    return (
      <div
        style={{
          marginLeft: this.props.drawerPosition ? "20%" : 0,
          transition: "margin .20s linear"
        }}
      >
        {/* onClickAway={this.handleClickAway} */}
        <div className="takeNoteInDashboard">
          {this.state.noteEditer ? (
            <ClickAwayListener>
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
        <div style={{ marginLeft: !this.props.view ? "8%" : 0 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "center"
            }}
          >
            {this.state.isAnyPinned ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",

                  flexDirection: "column",
                  textAlign: "left"
                }}
              >
                <div style={{ paddingLeft: 7, marginBottom: 10 }}>
                  <Typography style={{ fontSize: 20 }}>PINNED</Typography>
                </div>
                <div
                  className={this.props.view ? "noteCardsForList" : "noteCards"}
                >
                  {this.state.pinArray.map((value, index) => (
                    <div style={{ padding: 7 }}>
                      <NoteService
                        note={this.state.pinArray[index]}
                        array={this.state.pinArray}
                        handleRefresh={this.handleRefresh}
                        isGrid={this.state.isGrid}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginLeft: this.props.view ? "5%" : 0
            }}
          >
            <div className="noteCards">
              {this.state.isAnyPinned ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    marginTop: 20,
                    flexDirection: "column",
                    textAlign: "left",
                    marginLeft: this.props.view ? "65px" : 0
                  }}
                >
                  <div style={{ paddingLeft: 5, marginBottom: 5 }}>
                    <Typography style={{ fontSize: 20 }}>OTHER</Typography>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginLeft: this.props.view ? "15%" : 0
            }}
          >
            <div className="noteCards">
              {this.state.array.map((value, index) => (
                <div style={{ padding: 7 }}>
                  <NoteService
                    note={this.state.array[index]}
                    array={this.state.array}
                    handleRefresh={this.handleRefresh}
                    isGrid={this.state.isGrid}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Note);
