import React, { Component } from "react";
import { Paper, TextField, Chip } from "@material-ui/core";
import "../CssFiles/noteService.css";
import IconButton from "@material-ui/core/IconButton";
import PropTypes from "prop-types";
import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";
import ArchiveOutlinedIcon from "@material-ui/icons/ArchiveOutlined";
import { withStyles } from "@material-ui/styles";
import Pin from "../Images/pin.svg";
import Unpin from "../Images/pinned.png";
import moment from 'moment'
import {
  editNote,
  archive,
  deleteReminder,
  removeColaborator,
  pin,
  deleteNoteFromLabel
} from "./Service";
import MorePopover from "./MorePopover";
import EditNote from "./EditNote";
import ColorPopover from "./ColorPopover";
import ReminderPopover from "./ReminderPopover";
import ClearIcon from "@material-ui/icons/Clear";
import AddColaboratorDialog from "./AddColaboratorDialog";
import { connect } from "react-redux";
import SnackBar from "./SnackBar";

const mapStateToProps = state => {
  return {
    view: state.view
  };
};
const OverRidedIconButton = withStyles({
  root: {
    padding: "4.7px"
  }
})(IconButton);
const styles = theme => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    padding: theme.spacing.unit / 2
  },
  chip: {
    margin: theme.spacing.unit / 2
  }
});
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
      fromNotes: false,
      openSnackBar: false,
      messageInfo: "",
      titleDescChange: false
    };
  }

  handleClickSnackbar = message => {
    this.setState({
      openSnackBar: true,
      messageInfo: message
    });
  };

  handleCloseSnackbar = () => {
    this.setState({
      openSnackBar: false,
      messageInfo: ""
    });
  };
  onMouseEnterTrue = () => {
    this.setState({ onMouseEnter: true });
  };

  onMouseEnterFalse = () => {
    this.setState({ onMouseEnter: false });
  };

  handleTitleChange = event => {
    this.setState({
      title: event.target.value,
      titleDescChange: true
    });
  };

  handleDescriptionChange = event => {
    this.setState({
      description: event.target.value,
      titleDescChange: true
    });
  };
  handleClickOpen = () => {
    this.setState({
      open: true
    });
  };
  handleClose = value => {
    this.setState({ open: false });

    let note = this.state.note;
    note.title = this.state.title;
    note.description = this.state.description;
    let noteId = this.props.note.id;
    let token = localStorage.getItem("Token");
    if (this.state.titleDescChange) {
      editNote(noteId, note, token).then(Response => {
        console.log(Response);
        this.setState({
          titleDescChange: false
        });
        this.props.handleRefresh();
      });
    }
  };
  handleArchive = () => {
    let noteId = this.props.note.id;
    let token = localStorage.getItem("Token");
    archive(noteId, token).then(Response => {
      let archive = "Note archived";
      this.handleClickSnackbar(archive);
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

  handleDeleteReminder = () => {
    let noteId = this.props.note.id;
    let token = localStorage.getItem("Token");
    deleteReminder(noteId, token)
      .then(Response => {
        this.handleClickSnackbar("Reminder deleted");
        this.props.handleRefresh();
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleDeleteColaborator = email => {
    let noteId = this.props.note.id;
    let token = localStorage.getItem("Token");
    removeColaborator(noteId, email, token)
      .then(Response => {
       
        this.props.handleRefresh();
      })
      .catch(err => {
        console.log(err);
      });
  };
  handleDeleteLabel = label => {
    let noteId = this.props.note.id;
    let labelId = label.id;
    let token = localStorage.getItem("Token");
    deleteNoteFromLabel(noteId, labelId, token).then(Response => {
      this.props.handleRefresh();
    });
  };
  handlePin = () => {
    let noteId = this.props.note.id;
    let token = localStorage.getItem("Token");
    pin(noteId, token)
      .then(Response => {
        this.handleClickSnackbar("Note pinned");
        this.props.handleRefresh();
      })
      .catch(err => {
        console.log(err);
        this.props.handleRefresh();
      });
  };
  render() {
    return (
      <>
        <Paper
          className={this.props.view ? "noteServiceListView" : "noteService"}
          style={{ backgroundColor: this.props.note.color }}
          onMouseEnter={this.onMouseEnterTrue}
          onMouseLeave={this.onMouseEnterFalse}
        >
          <div className="noteService">
            <div className="titleAndDesc">
              <div className={this.props.view ? "pinForList" : "pin"}>
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
                    !this.props.note.pin ? (
                      <OverRidedIconButton
                        onClick={this.handlePin}
                        color="default"
                        aria-label="pin"
                      >
                        <img src={Pin} alt={Pin} />
                      </OverRidedIconButton>
                    ) : (
                      <OverRidedIconButton
                        onClick={this.handlePin}
                        color="default"
                        aria-label="pin"
                      >
                        <img src={Unpin} alt={Unpin} />
                      </OverRidedIconButton>
                    )
                  ) : null}
                </div>
              </div>
              
              <TextField
                multiline
                disabled
                InputProps={{ disableUnderline: true }}
                value={this.props.note.description}
                style={{
                  fontSize: 17,
                  width: this.props.view ? "590px" : null
                }}
                onClick={this.handleClickOpen}
              />

              <div className="chips">
                {this.props.note.reminder !== null &&
                this.props.note.reminder !== undefined ? (
                  <div
                    className="hoverChip"
                    style={{
                      marginLeft: "5px",
                      paddingBottom: "5px"
                    }}
                  >
                    <Chip
                      size="small"
                      label={moment(this.props.note.reminder).format('YYYY MMM D, HH:mm A')}
                      style={{
                        width: 'fit-content'
                      }}
                      icon={
                        <div className="clearButton">
                          <ClearIcon
                            onClick={this.handleDeleteReminder}
                            fontSize="small"
                          />
                        </div>
                      }
                      clickable={true}
                    />
                  </div>
                ) : null}
                {this.props.note.colaborators !== null &&
                this.props.note.colaborators !== undefined
                  ? this.props.note.colaborators.map(email => (
                      <div
                        className="hoverChip"
                        style={{
                          marginLeft: "5px",
                          paddingBottom: "8px"
                        }}
                      >
                        <Chip
                          size="small"
                          label={email}
                          style={{
                            width: "95px"
                          }}
                          icon={
                            <div className="clearButton">
                              <ClearIcon
                                onClick={() =>
                                  this.handleDeleteColaborator(email)
                                }
                                fontSize="small"
                              />
                            </div>
                          }
                          clickable={true}
                        />
                      </div>
                    ))
                  : null}
                {this.props.note.labelList !== null &&
                this.props.note.labelList !== undefined
                  ? this.props.note.labelList.map(
                      label => (
                        
                        (
                          <div
                            className="hoverChip"
                            style={{
                              marginLeft: "5px",
                              paddingBottom: "8px"
                            }}
                          >
                            <Chip
                              size="small"
                              label={label.title}
                              style={{
                                width: "95px"
                              }}
                              icon={
                                <div className="clearButton">
                                  <ClearIcon
                                    onClick={() =>
                                      this.handleDeleteLabel(label)
                                    }
                                    fontSize="small"
                                  />
                                </div>
                              }
                              clickable={true}
                            />
                          </div>
                        )
                      )
                    )
                  : null}
              </div>
            </div>

            <div
              className={
                this.props.view
                  ? "buttonsPaperNoteServiceForList"
                  : "buttonsPaperNoteService"
              }
            >
              <div
                className={
                  this.props.view
                    ? "buttonsNoteServiceForList"
                    : "buttonsNoteService"
                }
              >
                <ReminderPopover
                  note={this.props.note}
                  handleRefresh={this.props.handleRefresh}
                />
                <AddColaboratorDialog
                  note={this.props.note}
                  handleRefresh={this.props.handleRefresh}
                />
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
                  handleClickSnackbar={this.handleClickSnackbar}
                />
              </div>
            </div>
          </div>
        </Paper>
        <EditNote
          handleClose={this.handleClose}
          open={this.state.open}
          handleTitleChange={this.handleTitleChange}
          handleDescriptionChange={this.handleDescriptionChange}
          note={this.props.note}
        />
        <SnackBar
          handleCloseSnackbar={this.handleCloseSnackbar}
          messageInfo={this.state.messageInfo}
          openSnackBar={this.state.openSnackBar}
        />
      </>
    );
  }
}
NoteService.propTypes = {
  classes: PropTypes.object.isRequired
};
export default connect(mapStateToProps)(NoteService);
