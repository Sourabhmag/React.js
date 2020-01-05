import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Popover from "@material-ui/core/Popover";
import MoreVertOutlinedIcon from "@material-ui/icons/MoreVertOutlined";
import IconButton from "@material-ui/core/IconButton";
import "../CssFiles/morePopover.css";
import { trash, getLabels, addLabel, assignNoteToLabel } from "./Service";
import { TextField, Checkbox, Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { relative } from "path";

const OverRidedIconButton = withStyles({
  root: {
    padding: "4.7px"
  },
  label: {
    display: "flex",
    alignItems: "start",
    justifyContent: "start"
  }
})(IconButton);

const OverRidedPopover = withStyles({
  root: {
    top: "0px"
  },
  paper: {
    maxWidth: "200px",
    position: "relative"
  }
})(Popover);
const styles = theme => ({
  typography: {
    margin: theme.spacing.unit * 2
  }
});

class SimplePopover extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      anchorElMorePopover: null,
      anchorEl: null,
      labelArray: [],
      title: "",
      labelObj: {},
      checkedF: true
    };
  }

  handleMoreClick = event => {
    this.setState({
      anchorElMorePopover: event.currentTarget
    });
  };

  handleMoreClose = () => {
    this.setState({
      anchorElMorePopover: null
    });
  };
  handleDeleteNote = () => {
    console.log(this.props.history);
    trash(this.props.note.id, localStorage.getItem("Token")).then(Response => {
      console.log("Response :", Response);
      this.props.handleRefresh();
    });
    this.handleMoreClose();
  };
  handleClick = event => {
    this.setState({
      anchorEl: event.currentTarget
    });
    this.handleMoreClose();
  };

  handleClose = () => {
    this.setState({
      anchorEl: null
    });
  };
  getAllLabels = () => {
    getLabels(localStorage.getItem("Token")).then(Response => {
      this.setState({
        labelArray: Response.data.data
      });
    });
  };
  UNSAFE_componentWillMount() {
    this.getAllLabels();
    console.log(this.props.note);
  }
  handleLabelChange = event => {
    this.setState({
      title: event.target.value
    });
  };

  handleCreateLabel = () => {
    let label = this.state.labelObj;
    label.title = this.state.title;
    let token = localStorage.getItem("Token");

    addLabel(label, token).then(Response => {});
    this.handleClose();
  };

  handleChange = name => (event, id) => {
    // this.setState({ [name]: event.target.checked });
  };

  assignNoteToLabel = () => {
    let noteId = this.props.note.id;
    let labelId;
    let token = localStorage.getItem("Token");
    assignNoteToLabel();
  };
  render() {
    const { anchorElMorePopover } = this.state;
    const openMore = Boolean(anchorElMorePopover);
    const { classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div>
        <OverRidedIconButton
          aria-label="more"
          aria-owns={openMore ? "more-popper" : undefined}
          aria-haspopup="true"
          variant="contained"
          onClick={this.handleMoreClick}
        >
          <MoreVertOutlinedIcon />
        </OverRidedIconButton>

        <Popover
          id="more-popper"
          open={openMore}
          anchorEl={anchorElMorePopover}
          onClose={this.handleMoreClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left"
          }}
        >
          <div className="popover" style={{ padding: 10 }}>
            <OverRidedIconButton onClick={this.handleDeleteNote}>
              <Typography>Delete note</Typography>
            </OverRidedIconButton>

            <OverRidedIconButton
              aria-owns={open ? "simple-popper" : undefined}
              aria-haspopup="true"
              variant="contained"
              onClick={this.handleClick}
            >
              <Typography>Add label</Typography>
            </OverRidedIconButton>

            <OverRidedIconButton>
              <Typography>Add drawing</Typography>
            </OverRidedIconButton>

            <OverRidedIconButton>
              <Typography>Make a copy</Typography>
            </OverRidedIconButton>

            <OverRidedIconButton>
              <Typography>Show checkboxes</Typography>
            </OverRidedIconButton>

            <OverRidedIconButton>
              <Typography>Copy to Google Docs</Typography>
            </OverRidedIconButton>
          </div>
        </Popover>
        <OverRidedPopover
          id="simple-popper"
          open={open}
          anchorEl={anchorEl}
          onClose={this.handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center"
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center"
          }}
          style={{ top: "0px" }}
        >
          <Typography className={classes.typography}>Label note</Typography>
          <TextField
            placeholder="Enter Label name"
            onChange={this.handleLabelChange}
          />
          {this.state.labelArray.map(index => (
            <div className="labelList">
              <Checkbox
                style={{ padding: 0, color: "gray" }}
                checked={this.props.note}
                onChange={this.handleChange(index.id)}
              />
              <Typography style={{ paddingLeft: 5, fontSize: 15 }}>
                {index.title}
              </Typography>
            </div>
          ))}
          {this.state.title !== "" ? (
            <Button onClick={this.handleCreateLabel}>
              <Typography>
                <AddIcon style={{ paddingTop: 2 }} />
                Create "{this.state.title}"
              </Typography>
            </Button>
          ) : null}
        </OverRidedPopover>
      </div>
    );
  }
}

SimplePopover.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimplePopover);
