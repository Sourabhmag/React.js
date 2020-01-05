import React, { Component } from "react";
import { Paper,TextField } from "@material-ui/core";
import "../CssFiles/noteService.css";
import IconButton from "@material-ui/core/IconButton";
import AddAlertOutlinedIcon from "@material-ui/icons/AddAlertOutlined";
import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";
import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";
import ArchiveOutlinedIcon from "@material-ui/icons/ArchiveOutlined";
import { withStyles } from "@material-ui/styles";
import Pin from "../Images/pin.svg";
import KeepLogo from "../Images/keepLogo.png";
import { editNote, archive } from "./Service";
import MorePopover from "./MorePopover";
import EditNote from "./EditNote";
import ColorPopover from "./ColorPopover";

const OverRidedIconButton = withStyles({
  root: {
    padding: "4.7px"
  }
})(IconButton);
class NoteService extends Component {
  constructor(props) {
    super(props);

    this.state = {
      onMouseEnter: false,
      allNotes: [],
      open: false,
      title: "",
      description: "",
      note: {},
      viewColor: false,
      color: "",
      fromNotes: false
    };
  }
  onMouseEnterTrue = () => {
    this.setState({ onMouseEnter: true });
  };

  onMouseEnterFalse = () => {
    this.setState({ onMouseEnter: false });
  };

  handleTitleChange = event => {
    this.setState({
      title: event.target.value
    });
  };

  handleDescriptionChange = event => {
    this.setState({
      description: event.target.value
    });
  };
  handleClickOpen = () => {
    this.setState({
      open: true
    });
  };
  handleClose = value => {
    this.setState({ open: false });
    console.log(this.state.title);
    console.log(this.state.description);

    let note = this.state.note;
    note.title = this.state.title;
    note.description = this.state.description;
    let noteId = this.props.note.id;
    let token = localStorage.getItem("Token");
    editNote(noteId, note, token).then(Response => {
      console.log(Response);
    });
  };
  handleArchive = () => {
    let noteId = this.props.note.id;
    let token = localStorage.getItem("Token");
    archive(noteId, token).then(Response => {
      console.log(Response);
      // if(this.state.fromNotes)
      this.props.handleRefresh();
    });
  };
  handleColorTrue = () => {
    this.setState({
      viewColor: true
    });
  };
  handleColorFalse = () => {
    this.setState({
      viewColor: false
    });
  };
  handleColor = () => {
    this.setState({
      viewColor: false
    });
  };
  render() {
    return (
      <>
        <Paper
          className="noteService"
          style={{ backgroundColor: this.props.note.color }}
          onMouseEnter={this.onMouseEnterTrue}
          onMouseLeave={this.onMouseEnterFalse}
        >
          <div className="titleAndDesc">
            <div className="pin">
              <div>
                <TextField
                  multiline
                  disabled
                  InputProps={{ disableUnderline: true }}
                  value={this.props.note.title}
                  style={{ fontSize: 17, marginBottom: 5 }}
                  onClick={this.handleClickOpen}
                />
              </div>

              <div>
                {this.state.onMouseEnter ? (
                  <OverRidedIconButton color="default" aria-label="pin">
                    <img src={Pin} alt={KeepLogo} />
                  </OverRidedIconButton>
                ) : null}
              </div>
            </div>
            <TextField
              multiline
              disabled
              InputProps={{ disableUnderline: true }}
              value={this.props.note.description}
              style={{ fontSize: 17 }}
              onClick={this.handleClickOpen}
            ></TextField>
          </div>
          <div>
            {this.state.onMouseEnter ? (
              <div className="buttonsPapernoteService">
                <div className="buttonsNoteService">
                  <OverRidedIconButton aria-label="Reminder">
                    <AddAlertOutlinedIcon fontSize="small" />
                  </OverRidedIconButton>
                  <OverRidedIconButton aria-label="Add Colaborator">
                    <PersonAddOutlinedIcon />
                  </OverRidedIconButton>
                  <ColorPopover
                    note={this.props.note}
                    handleRefresh={this.props.handleRefresh}
                  />

                  <OverRidedIconButton aria-label="image">
                    <ImageOutlinedIcon />
                  </OverRidedIconButton>
                  <OverRidedIconButton
                    onClick={this.handleArchive}
                    aria-label="archive"
                  >
                    <ArchiveOutlinedIcon />
                  </OverRidedIconButton>
                  <MorePopover
                    note={this.props.note}
                    handleRefresh={this.props.handleRefresh}
                  />
                </div>
              </div>
            ) : null}
          </div>
        </Paper>
        <EditNote
          handleClose={this.handleClose}
          open={this.state.open}
          handleTitleChange={this.handleTitleChange}
          handleDescriptionChange={this.handleDescriptionChange}
          note={this.props.note}
        />
      </>
    );
  }
}

export default NoteService;