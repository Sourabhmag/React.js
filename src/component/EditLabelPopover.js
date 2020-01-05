import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import blue from "@material-ui/core/colors/blue";
import { getLabels, addLabel } from "./Service";
import { TextField, Divider, Typography } from "@material-ui/core";
import AddOutlinedIcon from "@material-ui/icons/AddOutlined";
import CheckOutlinedIcon from "@material-ui/icons/CheckOutlined";
import "../CssFiles/editLabelPopver.css";
import LabelList from "./LabelList";

const emails = ["username@gmail.com", "user02@gmail.com"];
const styles = {
  avatar: {
    backgroundColor: blue[100],
    color: blue[600]
  }
};
const OverridedButton = withStyles({
  root: {
    paddingRight: "2.2pc"
  }
})(Button);
class SimpleDialog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      labelArray: [],
      deleteOrLabel: true,
      isDelete: false,
      title: "",
      labelObj:{}
    };
  }
  addLabel = () => {
    let label = this.state.labelObj;
    label.title = this.state.title;
    let token = localStorage.getItem("Token");
    addLabel(label, token).then(Response => {
      console.log(Response);
      this.getAllLabels();
    });
  };
  handleLabelChange = event => {
    this.setState({
      title: event.target.value
    });
  };
  handleClose = () => {
    this.props.onClose(this.props.selectedValue);
  };

  handleListItemClick = value => {
    this.props.onClose(value);
  };

  getAllLabels = () => {
    getLabels(localStorage.getItem("Token")).then(Response => {
      this.setState({
        labelArray: Response.data.data
      });
    });
  };
  componentWillMount() {
    this.getAllLabels();
  }

  render() {
    const { classes, onClose, selectedValue, ...other } = this.props;

    return (
      <Dialog
        onClose={this.handleClose}
        aria-labelledby="simple-dialog-title"
        {...other}
      >
        <div className="TextBox">
          <div>
            <OverridedButton>
              <AddOutlinedIcon />
            </OverridedButton>
          </div>
          <div>
            <TextField onChange={this.handleLabelChange} />
          </div>
          <div>
            <Button onClick={this.addLabel}>
              <CheckOutlinedIcon />
            </Button>
          </div>
        </div>
        {this.state.labelArray !== null && this.state.labelArray !== undefined 
        && this.state.labelArray.map(label => (
          <LabelList labelName={label} getAllLabels = {this.getAllLabels}/>
        ))}
        <Divider/>
        <Typography className="Done" onClick={this.handleClose}>Done</Typography>
      </Dialog>
    );
  }
}

const SimpleDialogWrapped = withStyles(styles)(SimpleDialog);

class SimpleDialogDemo extends React.Component {
  state = {
    open: false,
    selectedValue: emails[1]
  };

  handleClickOpen = () => {
    this.setState({
      open: true
    });
  };

  handleClose = value => {
    this.setState({ selectedValue: value, open: false });
  };

  render() {
    return (
      <div>
        <Button
          variant="outlined"
          color="primary"
          onClick={this.handleClickOpen}
        >
          Open simple dialog
        </Button>
        <SimpleDialogWrapped
          selectedValue={this.state.selectedValue}
          open={this.state.open}
          onClose={this.handleClose}
        />
      </div>
    );
  }
}

export default SimpleDialogDemo;
