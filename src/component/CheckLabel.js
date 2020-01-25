import React, { Component } from "react";
import { Checkbox, Typography } from "@material-ui/core";
import { deleteNoteFromLabel } from "./Service";

export class CheckLabel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checkedA: false
    };
  }

  handleChange = event => {
    this.setState({ checkedA: event.target.checked }, () => {
      if (this.state.checkedA) {
        this.props.assignNoteToLabel(this.props.label);
      } else {
        if (this.props.note) {
          console.log("In else of if", this.state.checkedA);
          let noteId = this.props.note.id;
          let labelId = this.props.label.id;
          let token = localStorage.getItem("Token");
          deleteNoteFromLabel(noteId, labelId, token).then(Response => {
            this.setState(
              {
                checkedA: false
              },
              () => {
                this.props.handleRefresh();
              }
            );
          });
        } else {
          let array = this.props.labelArray;
          let index = array.indexOf(this.props.label);
          array.splice(index, 1);
          this.props.getLabelData(array);
          this.setState(
            {
              checkedA: false
            },
            () => {
              console.log("In else of else", this.state.checkedA);
            }
          );
        }
      }
    });
  };
  handleChecked = () => {
    var flag = false;
    if (this.props.note !== null && this.props.note !== undefined) {
      this.props.note.labelList.map(labelFromNote => {
        if (labelFromNote.id === this.props.label.id) {
          flag = true;
        }
      });
    } else {
      this.props.labelArray.map(labelFromNote => {
        if (labelFromNote.id === this.props.label.id) {
          flag = true;
        }
      });
    }

    return flag;
  };

  render() {
    return (
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Checkbox
          checked={this.handleChecked()}
          onChange={event => this.handleChange(event)}
        />
        <Typography style={{ paddingLeft: 5, fontSize: 15, paddingTop: 10 }}>
          {this.props.label.title}
        </Typography>
      </div>
    );
  }
}

export default CheckLabel;
