import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";
import ArchiveOutlinedIcon from "@material-ui/icons/ArchiveOutlined";
import MorePopover from "./MorePopover";
import UndoOutlinedIcon from "@material-ui/icons/UndoOutlined";
import RedoOutlinedIcon from "@material-ui/icons/RedoOutlined";
import "../CssFiles/takeNoteWithTitle.css";
import { Button, Typography, Chip } from "@material-ui/core";
import Pin from "../Images/pin.svg";
import KeepLogo from "../Images/keepLogo.png";
import ReminderPopover from "./ReminderPopover";
import { connect } from "react-redux";
import ClearIcon from "@material-ui/icons/Clear";
import { addReminderRedux } from "../Redux/Action";
import ColorPopover from "./ColorPopover";
import AddColaboratorDialog from "./AddColaboratorDialog";
import Unpin from "../Images/pinned.png";
import moment from "moment";

const mapStateToProps = state => {
  return {
    reminder: state.reminder
  };
};
var temp = "";
const mapDispatchToProps = dispatch => {
  return {
    addReminderRedux: () => dispatch(addReminderRedux())
  };
};
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

  const [reminderDate, setReminderDate] = React.useState(null);
  const [colorDate, setColorDate] = React.useState("");
  const [archiveDate, setArchiveDate] = React.useState(false);
  const [isPin, setPin] = React.useState(false);
  const [colaboratorArray, setColaborator] = React.useState([]);
  const [labelArray, setLabel] = React.useState([]);

  const getReminderData = data => {
    setReminderDate(data);
  };
  const getColorData = data => {
    setColorDate(data);
  };
  const getLabelData = data => {
    setLabel(data);
  };
  const getColaboratorData = data => {
    setColaborator(data);
  };

  const handleDeleteColaborator = email => {
    let array = colaboratorArray;
    let index = array.indexOf(email);
    array.splice(index, 1);
    setColaborator(array);
  };

  const handleDeleteLabel = label => {
    let array = labelArray;
    let index = array.indexOf(label);
    array.splice(index, 1);
    setLabel(array);
  };
  console.log(typeof reminderDate);

  return (
    <Paper style={{ backgroundColor: colorDate }} className="headPaper">
      <div className="title">
        <InputBase
          className={classes.input}
          placeholder="Title"
          onChange={props.title}
        />
        <div>
          {!isPin ? (
            <IconButton
              onClick={() => setPin(!isPin)}
              color="default"
              aria-label="pin"
            >
              <img src={Pin} alt={Pin} />
            </IconButton>
          ) : (
            <IconButton
              onClick={() => setPin(!isPin)}
              color="default"
              aria-label="pin"
            >
              <img src={Unpin} alt={Unpin} />
            </IconButton>
          )}
        </div>
      </div>

      <div className="note">
        <InputBase
          className={classes.input}
          placeholder="Take a note..."
          onChange={props.description}
        />
      </div>
      <div className="chips">
        {reminderDate !== null ? (
          <div
            className="hoverChip"
            style={{
              marginLeft: "5px",
              paddingBottom: "5px"
            }}
          >
            <Chip
              size="small"
              label={moment(reminderDate).format("YYYY MMM D, HH:mm A")}
              // label={reminderDate.toString()}
              style={{
                width: "fit-content"
              }}
              icon={
                <div className="clearButton">
                  <ClearIcon
                    onClick={() => setReminderDate(null)}
                    fontSize="small"
                  />
                </div>
              }
              clickable={true}
            />
          </div>
        ) : null}
        {colaboratorArray !== null && colaboratorArray !== undefined
          ? colaboratorArray.map(email => (
              <div
                key={email}
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
                        onClick={() => handleDeleteColaborator(email)}
                        fontSize="small"
                      />
                    </div>
                  }
                  clickable={true}
                />
              </div>
            ))
          : null}
        {labelArray !== null && labelArray !== undefined
          ? labelArray.map(label => (
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
                        onClick={() => handleDeleteLabel(label)}
                        fontSize="small"
                      />
                    </div>
                  }
                  clickable={true}
                />
              </div>
            ))
          : null}
      </div>
      <div className="buttonsPaper">
        <div className="buttons">
          <IconButton className={classes.iconButton} aria-label="Reminder">
            <ReminderPopover getReminderData={getReminderData} />
          </IconButton>
          <IconButton
            className={classes.iconButton}
            aria-label="Add Colaborator"
          >
            <AddColaboratorDialog getColaboratorData={getColaboratorData} />
          </IconButton>
          <IconButton className={classes.iconButton} aria-label="color">
            <ColorPopover getColorData={getColorData} />
          </IconButton>
          <IconButton className={classes.iconButton} aria-label="Image">
            <ImageOutlinedIcon />
          </IconButton>
          <IconButton
            onClick={() => setArchiveDate(!archiveDate)}
            className={classes.iconButton}
            aria-label="Archive"
          >
            <ArchiveOutlinedIcon />
          </IconButton>
          <IconButton className={classes.iconButton} aria-label="more">
            <MorePopover getLabelData={getLabelData} labelArray={labelArray} />
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
              onClick={() =>
                props.handleClickAway(
                  isPin,
                  colorDate,
                  colaboratorArray,
                  archiveDate,
                  reminderDate,
                  labelArray
                )
              }
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(CustomizedInputBase));
