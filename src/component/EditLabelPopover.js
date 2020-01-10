import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import { getLabels, addLabel } from "./Service";
import { TextField, Divider, Typography, Paper } from "@material-ui/core";
import AddOutlinedIcon from "@material-ui/icons/AddOutlined";
import CheckOutlinedIcon from "@material-ui/icons/CheckOutlined";
import "../CssFiles/editLabelPopver.css";
import LabelList from "./LabelList";

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
      labelObj: {}
    };
  }
  addLabel = () => {
    let label = this.state.labelObj;
    label.title = this.state.title;
    this.setState({
      title:""
    })
    let token = localStorage.getItem("Token");
    addLabel(label, token).then(Response => {
      console.log(Response);
      this.getAllLabels();
      this.props.getAllLabels();
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
      console.log(Response.data.data);

      this.setState({
        labelArray: Response.data.data
      });
      let array = this.state.labelArray.reverse();
      console.log(array);

      this.setState({
        labelArray: array
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
       style={{maxHeight:"600px"}}
      >
        <Typography style={{ fontWeight: "bold" }} className="AddLabelText">
          Add Label
        </Typography>

        <div className="TextBox">
          <div>
            <OverridedButton style={{marginLeft:"7px"}}>
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
        {this.state.labelArray !== null &&
          this.state.labelArray !== undefined ?
          this.state.labelArray.map(label => (
            <LabelList
              labelName={label}
              getAllLabels={this.getAllLabels}
              drowerLabels={this.props.getAllLabels}
            />
          )) : null}
        <Divider />
        <Typography className="Done" onClick={this.handleClose}>
          Done
        </Typography>
      </Dialog>
    );
  }
}
export default SimpleDialog;
