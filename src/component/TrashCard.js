import React, { Component } from "react";
import { withStyles} from "@material-ui/styles";
import IconButton from "@material-ui/core/IconButton";
import { Paper, Typography, Tooltip } from "@material-ui/core";
import DeleteForeverRoundedIcon from "@material-ui/icons/DeleteForeverRounded";
import RestoreFromTrashOutlinedIcon from "@material-ui/icons/RestoreFromTrashOutlined";
import { deleteNote, trash } from "./Service";
import { connect } from "react-redux";

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
class TrashCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      onMouseEnter: false,
      allNotes: []
    };
  }
  onMouseEnterTrue = () => {
    this.setState({ onMouseEnter: true });
  };

  onMouseEnterFalse = () => {
    this.setState({ onMouseEnter: false });
  };

  deleteForever = () => {
    let noteId = this.props.note.id;
    let token = localStorage.getItem("Token");
    deleteNote(noteId, token).then(Response => {
      console.log(Response);
      this.props.handleRefresh();
    });
  };
  restore = () => {
    let noteId = this.props.note.id;
    let token = localStorage.getItem("Token");
    trash(noteId, token).then(Response => {
      console.log(Response);
      this.props.handleRefresh();
    });
  };
  render() {
    return (
      <Paper
        className={this.props.view?"noteServiceListView":"noteService"}
        onMouseEnter={this.onMouseEnterTrue}
        onMouseLeave={this.onMouseEnterFalse}
        style={{backgroundColor:this.props.note.color}}
      >
        <div>
          <div className="pin">
            <Typography style={{ fontSize: 17 }}>
              {this.props.note.title}
            </Typography>
          </div>
          <Typography style={{ fontSize: 17 }}>
            {this.props.note.description}
          </Typography>
        </div>
        <div>
          {this.state.onMouseEnter ? (
            <div className="buttonsPapernoteService">
              <div className="buttonsNoteService">
                <Tooltip title="Delete Forever">
                  <OverRidedIconButton
                    onClick={this.deleteForever}
                    aria-label="delete"
                  >
                    <DeleteForeverRoundedIcon fontSize="small" />
                  </OverRidedIconButton>
                </Tooltip>
                <Tooltip title="Restore">
                  <OverRidedIconButton
                    onClick={this.restore}
                    aria-label="Add Colaborator"
                  >
                    <RestoreFromTrashOutlinedIcon />
                  </OverRidedIconButton>
                </Tooltip>
              </div>
            </div>
          ) : null}
        </div>
      </Paper>
    );
  }
}

export default connect(mapStateToProps)(TrashCard);
