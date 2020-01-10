import React, { Component } from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  InputBase
} from "@material-ui/core";
import LabelIcon from "@material-ui/icons/Label";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import CheckOutlinedIcon from "@material-ui/icons/CheckOutlined";
import { withStyles } from "@material-ui/styles";
import { updateLabel, deleteLabel } from "./Service";

class LabelList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      deleteOrLabel: true,
      editLabel: true,
      labelChange: "",
      labelObj: {},
      title: "",
      labelTitle:this.props.labelName.title
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
          this.props.drowerLabels();
        });
      }
    );
  };
  handleDelete = () => {
    console.log(this.props.labelName.title);

    deleteLabel(this.props.labelName.id, localStorage.getItem("Token")).then(
      Response => {
        console.log(Response);
        this.props.getAllLabels();
        this.props.drowerLabels();
      }
    );
  };
  handleChangeLabel = event => {
    this.setState({
      title: event.target.value
    });
  };
  render() {
    console.log(this.props.labelName.title);

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

            <ListItemIcon style={{ marginRight: -27 }}>
              {this.state.editLabel ? (
                <EditIcon />
              ) : (
                <CheckOutlinedIcon onClick={this.handleEditLabelDone} />
              )}
            </ListItemIcon>
          </ListItem>
        </List>
      </div>
    );
  }
}

export default LabelList;
