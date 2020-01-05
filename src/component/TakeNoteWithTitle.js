import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import AddAlertOutlinedIcon from "@material-ui/icons/AddAlertOutlined";
import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";
import ColorLensOutlinedIcon from "@material-ui/icons/ColorLensOutlined";
import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";
import ArchiveOutlinedIcon from "@material-ui/icons/ArchiveOutlined";
import MoreVertOutlinedIcon from "@material-ui/icons/MoreVertOutlined";
import UndoOutlinedIcon from "@material-ui/icons/UndoOutlined";
import RedoOutlinedIcon from "@material-ui/icons/RedoOutlined";
import "../CssFiles/takeNoteWithTitle.css";
import { Button, Typography } from "@material-ui/core";
import Pin from "../Images/pin.svg"
import KeepLogo from "../Images/keepLogo.png";

const styles = {
  root: {
    // padding: "2px 4px",
    display: "flex",
    alignItems: "center"
  },
  input: {
    marginLeft: "2%",
    flex: 1
  },
  iconButton: {
    padding: 8
  }
};

function CustomizedInputBase(props) {
  const { classes } = props;

  return (
    <Paper className="headPaper">
      <div className="title">
        <InputBase
          className={classes.input}
          placeholder="Title"
          onChange={props.title}
        />
        <IconButton className={classes.iconButton} color="default" aria-label="pin">
          <img src={Pin} alt={KeepLogo}/>
        </IconButton>
      </div>

      <div className="note">
        <InputBase
          className={classes.input}
          placeholder="Take a note..."
          onChange={props.description}
        />
      </div>

      <div className="buttonsPaper">
        <div className="buttons">
          <IconButton className={classes.iconButton} aria-label="Reminder">
            <AddAlertOutlinedIcon fontSize="small" />
          </IconButton>
          <IconButton
            className={classes.iconButton}
            aria-label="Add Colaborator"
          >
            <PersonAddOutlinedIcon />
          </IconButton>
          <IconButton className={classes.iconButton} aria-label="Image">
            <ColorLensOutlinedIcon />
          </IconButton>
          <IconButton className={classes.iconButton} aria-label="Archive">
            <ImageOutlinedIcon />
          </IconButton>
          <IconButton className={classes.iconButton} aria-label="More">
            <ArchiveOutlinedIcon />
          </IconButton>
          <IconButton className={classes.iconButton} aria-label="Search">
            <MoreVertOutlinedIcon />
          </IconButton>
          <IconButton className={classes.iconButton} aria-label="Undo">
            <UndoOutlinedIcon />
          </IconButton>
          <IconButton className={classes.iconButton} aria-label="Redo">
            <RedoOutlinedIcon />
          </IconButton>
        </div>
        <div>
          <Typography>
            <Button
              variant="inherit"
              color="primary"
              onClick={props.handleClickAway}
            >
              Close
            </Button>
          </Typography>
        </div>
      </div>
    </Paper>
  );
}

CustomizedInputBase.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CustomizedInputBase);
