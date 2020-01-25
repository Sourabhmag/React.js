import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import AddAlertOutlinedIcon from "@material-ui/icons/AddAlertOutlined";
import Popover from "@material-ui/core/Popover";
import "../CssFiles/reminderPopover.css";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import { IconButton, TextField } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import DateFnsUtils from "@date-io/date-fns";
import { addReminderRedux } from "../Redux/Action";
import {
  MuiPickersUtilsProvider,
  TimePicker,
  DatePicker
} from "material-ui-pickers";
import { addReminder } from "./Service";
import { connect } from "react-redux";

const OverRidedIconButton = withStyles({
  root: {
    padding: "4.7px"
  }
})(IconButton);
const styles = theme => ({
  typography: {
    margin: theme.spacing.unit * 2
  }
});
class SimplePopover extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      anchorEl: null,
      anchorElReminderPopover: null,
      selectedDate: new Date(),
      currentDate: new Date()
    };
    this.ReminderButtonRef = React.createRef();
  }

  handleClickReminderPopover = event => {
    // console.log('event in pop',event.nativeEvent.stopImmediatePropagation());
    event.nativeEvent.stopImmediatePropagation();

    this.setState(
      {
        anchorElReminderPopover: event.currentTarget
      },
      () => {
        this.handleClose();
      }
    );
  };

  handleCloseReminderPopover = () => {
    this.setState({
      anchorElReminderPopover: null
    });
  };
  handleClick = event => {
    this.setState({
      anchorEl: event.currentTarget
    });
  };

  handleClose = () => {
    this.setState({
      anchorEl: null
    });
  };

  handleDateChange = date => {
    let newDate = new Date(date);
    this.setState({ selectedDate: newDate });
  };
  handleSetReminder = () => {
    let date = this.state.selectedDate;
    if (this.props.note !== null && this.props.note !== undefined) {
      let noteId = this.props.note.id;
      let token = localStorage.getItem("Token");

      addReminder(date, noteId, token)
        .then(Response => {
          this.props.handleRefresh();
        })
        .catch(err => {
          this.props.handleRefresh();
        });
    } else {
      // this.props.addReminderRedux(date);
      this.props.getReminderData(date);
    }

    this.handleCloseReminderPopover();
    this.handleClose();
  };
  handleClickSetReminder = event => {
    event.nativeEvent.stopImmediatePropagation();

    let currentDate = this.state.currentDate.toLocaleDateString();
    let selectedDate = this.state.selectedDate.toLocaleDateString();

    let currentTime = this.state.currentDate.getTime();
    let selectedTime = this.state.selectedDate.getTime();

    if (currentDate.localeCompare(selectedDate) === 0) {
      if (currentTime < selectedTime) {
        this.handleSetReminder();
      } else {
        alert("Select correct time and date");
      }
    } else {
      if (currentDate.localeCompare(selectedDate) < 0) {
        this.handleSetReminder();
      } else {
        alert("Select correct time and date");
      }
    }
  };
  render() {
    const { anchorEl, anchorElReminderPopover } = this.state;
    const open = Boolean(anchorEl);
    const openReminderPopover = Boolean(anchorElReminderPopover);

    return (
      <div>
        <OverRidedIconButton
          aria-owns={open ? "simple-popper" : undefined}
          aria-haspopup="true"
          variant="contained"
          ref={this.ReminderButtonRef}
          onClick={this.handleClick}
          aria-label="Reminder"
        >
          <AddAlertOutlinedIcon fontSize="small" />
        </OverRidedIconButton>
        <Popover
          id="simple-popper"
          open={open}
          anchorEl={this.ReminderButtonRef.current}
          onClose={this.handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left"
          }}
        >
          <div className="main">
            <Typography>Reminder :</Typography>
            <div className="today">
              <Typography style={{ fontSize: 14 }}>Later Today</Typography>
              <Typography style={{ fontSize: 14 }}>8:00 PM</Typography>
            </div>
            <div className="today">
              <Typography style={{ fontSize: 14 }}>Tomorrow</Typography>
              <Typography style={{ fontSize: 14 }}>8:00 PM</Typography>
            </div>
            <div className="today">
              <Typography style={{ fontSize: 14 }}>Next week</Typography>
              <Typography style={{ fontSize: 14 }}>Mon 8:00 PM</Typography>
            </div>
            <div
              className="pickDateAndTime"
              aria-owns={openReminderPopover ? "Reminder-Popover" : undefined}
              aria-haspopup="true"
              variant="contained"
              onClick={this.handleClickReminderPopover}
            >
              <AccessTimeIcon style={{ height: 18, width: 18, marginTop: 1 }} />
              <Typography style={{ fontSize: 14, marginLeft: 15 }}>
                Pick date & time
              </Typography>
            </div>
          </div>
        </Popover>
        <Popover
          id="Reminder-Popover"
          open={openReminderPopover}
          anchorEl={this.ReminderButtonRef.current}
          onClose={this.handleCloseReminderPopover}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left"
          }}
        >
          <div
            style={{
              padding: "10px",
              display: "flex",
              flexDirection: "column"
            }}
          >
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid
                container
                style={{ display: "flex", flexDirection: "column" }}
              >
                <DatePicker
                  margin="normal"
                  label="Date picker"
                  value={this.state.selectedDate}
                  onChange={this.handleDateChange}
                />
                <TimePicker
                  margin="normal"
                  label="Time picker"
                  value={this.state.selectedDate}
                  onChange={this.handleDateChange}
                />
              </Grid>
            </MuiPickersUtilsProvider>
            <Typography
              onClick={this.handleClickSetReminder}
              style={{ marginLeft: 130, paddingTop: 10, cursor: "pointer" }}
            >
              Save
            </Typography>
          </div>
        </Popover>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    view: state.view,
    drawerPosition: state.drawerPosition
  };
};
var temp = "";
const mapDispatchToProps = dispatch => {
  return {
    addReminderRedux: () => dispatch(addReminderRedux())
  };
};
SimplePopover.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(SimplePopover));
