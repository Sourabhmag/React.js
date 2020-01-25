import React, { Component } from "react";
import { getNoteByLabelId, addNote } from "./Service";
import "../CssFiles/dashBoard.css";
import NoteService from "./NoteService";
import { ClickAwayListener, Typography } from "@material-ui/core";
import { connect } from "react-redux";
import TakeNoteWithTitle from "./TakeNoteWithTitle";
import TakeNote from "./TakeNote";

const mapStateToProps = state => {
  return {
    view: state.view,
    drawerPosition: state.drawerPosition,
    reminder: state.reminder
  };
};
export class NoteWithLabel extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
      noteEditer: false
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
      this.getAllNotesByLabel();
    }
  };
  getAllNotesByLabel = () => {
    let labelId = this.props.location.state.labelObj.id;
    let token = localStorage.getItem("Token");
    getNoteByLabelId(labelId, token)
      .then(Response => {
        console.log(Response.data);
        this.setState({
          array: Response.data.data
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          array: null
        });
      });
  };

  componentWillMount() {
    this.getAllNotesByLabel();
  }
  componentDidUpdate(prevProps) {
    console.log(prevProps);
    console.log(this.props);

    if (
      this.props.location.state.labelObj.id !==
      prevProps.location.state.labelObj.id
    ) {
      this.getAllNotesByLabel();
    }
  }
  render() {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          marginLeft: this.props.drawerPosition ? "20%" : 0,
          transition: "margin .20s linear"
        }}
      >
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
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginLeft: this.props.view ? "15%" : 0
          }}
        >
          <div className="noteCards">
            {this.state.array !== null && this.state.array !== undefined ? (
              this.state.array.map((value, index) => (
                <div style={{ padding: 7 }}>
                  <NoteService
                    note={this.state.array[index]}
                    array={this.state.array}
                    handleRefresh={this.getAllNotesByLabel}
                    isGrid={this.props.location.state.isGrid}
                  />
                </div>
              ))
            ) : (
              <Typography style={{ fontSize: 20, marginLeft: 250 }}>
                No notes found for this label
              </Typography>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(NoteWithLabel);
