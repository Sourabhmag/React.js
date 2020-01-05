import React from "react";
import "../CssFiles/editNote.css";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import { TextField, IconButton, Typography } from "@material-ui/core";
import Pin from "../Images/pin.svg";
import KeepLogo from "../Images/keepLogo.png";
import AddAlertOutlinedIcon from "@material-ui/icons/AddAlertOutlined";
import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";
import ColorLensOutlinedIcon from "@material-ui/icons/ColorLensOutlined";
import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";
import ArchiveOutlinedIcon from "@material-ui/icons/ArchiveOutlined";
import MorePopover from "./MorePopover";

const OverRidedIconButton = withStyles({
  root: {
    padding: "4.7px"
  }
})(IconButton);

export default class SimpleDialog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <Dialog
        onClose={this.props.handleClose}
        aria-labelledby="simple-dialog-title"
        open={this.props.open}
      >
        <div className="editNote">
          <div>
            <div className="pinEditNote">
              <div>
                <TextField
                  multiline
                  InputProps={{ disableUnderline: true }}
                  defaultValue={this.props.note.title}
                  style={{ fontSize: 17, marginBottom: 5, width: 551 }}
                  onChange={this.props.handleTitleChange}
                />
              </div>

              <div>
                <OverRidedIconButton color="default" aria-label="pin">
                  <img src={Pin} alt={KeepLogo} />
                </OverRidedIconButton>
              </div>
            </div>
            <TextField
              multiline
              InputProps={{ disableUnderline: true }}
              defaultValue={this.props.note.description}
              style={{ fontSize: 17, width: 551 }}
              onChange={this.props.handleDescriptionChange}
            />
          </div>
          <div className="buttonsPaperEditNote">
            <div className="buttonsEditNote">
              <OverRidedIconButton aria-label="Reminder">
                <AddAlertOutlinedIcon fontSize="small" />
              </OverRidedIconButton>
              <OverRidedIconButton aria-label="Add Colaborator">
                <PersonAddOutlinedIcon />
              </OverRidedIconButton>
              <OverRidedIconButton aria-label="color">
                <ColorLensOutlinedIcon />
              </OverRidedIconButton>
              <OverRidedIconButton aria-label="image">
                <ImageOutlinedIcon />
              </OverRidedIconButton>
              <OverRidedIconButton aria-label="archive">
                <ArchiveOutlinedIcon />
              </OverRidedIconButton>
              <MorePopover note={this.props.note} />
            </div>
            <div>
              <Button onClick={this.props.handleClose}>
                <Typography>Close</Typography>
              </Button>
            </div>
          </div>
        </div>
      </Dialog>
    );
  }
}
