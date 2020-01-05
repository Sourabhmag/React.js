import React, { Component } from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  InputBase
} from "@material-ui/core";
import LabelIcon from "@material-ui/icons/Label";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import CheckOutlinedIcon from "@material-ui/icons/CheckOutlined";
import { withStyles } from "@material-ui/styles";
import { updateLabel, deleteLabel } from "./Service";

const OverridedEditIcon = withStyles({
  root: {
    paddingLeft: "23px"
  }
})(EditIcon);

const OverridedCheckOutlinedIcon = withStyles({
  root: {
    paddingLeft: "23px"
  }
})(CheckOutlinedIcon);
class LabelList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      deleteOrLabel: true,
      editLabel: true,
      labelChange: "",
      labelObj: {},
      title:""
    };
  }

  handleOnMouseEnter = () => {
    this.setState({
      deleteOrLabel: false
    });
  };

  handleOnMouseLeave = () => {
    this.setState({
      deleteOrLabel: true
    });
  };

  handleEditLabel = () => {
    this.setState({
      deleteOrLabel: false,
      editLabel: false
    });
  };

  handleEditLabelDone = () => {
    this.setState(
      {
        deleteOrLabel: true,
        editLabel: true
      },
      () => {
        let label = this.state.labelObj;
        label.title = this.state.title;
        let labelId = this.props.labelName.id;
        let token = localStorage.getItem("Token");
        updateLabel(labelId, label, token).then(Response => {
          console.log(Response);
          this.props.getAllLabels();
        });
      }
    );
  };
  handleDelete = () => {
    console.log(this.props.labelName.title);
    
    deleteLabel(
      this.props.labelName.id,
      localStorage.getItem("Token")
    ).then(Response => {
      console.log(Response);
      this.props.getAllLabels();
    });
  };
  handleChangeLabel = event => {
    this.setState({
      title: event.target.value
    });
  };
  render() {
    return (
      <div>
        <List
          onMouseEnter={this.handleOnMouseEnter}
          onMouseLeave={this.handleOnMouseLeave}
        >
          <ListItem
            button
            key="label"
            style={{
              minWidth: "250px"
            }}
          >
            <ListItemIcon>
              {this.state.deleteOrLabel ? (
                <LabelIcon />
              ) : (
                <DeleteIcon onClick={this.handleDelete} />
              )}
            </ListItemIcon>
            <ListItemText>
              <InputBase
                defaultValue={this.props.labelName.title}
                onClick={this.handleEditLabel}
                onChange={this.handleChangeLabel}
              />
            </ListItemText>

            <ListItemIcon style={{}}>
              {this.state.editLabel ? (
                <OverridedEditIcon />
              ) : (
                <OverridedCheckOutlinedIcon
                  onClick={this.handleEditLabelDone}
                />
              )}
            </ListItemIcon>
          </ListItem>
        </List>
      </div>
    );
  }
}

export default LabelList;
