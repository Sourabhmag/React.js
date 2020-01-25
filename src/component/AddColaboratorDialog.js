import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ClearIcon from "@material-ui/icons/Clear";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import PersonIcon from "@material-ui/icons/Person";
import AddIcon from "@material-ui/icons/Add";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import blue from "@material-ui/core/colors/blue";
import { InputBase, ListItemIcon, IconButton, Button } from "@material-ui/core";
import DoneIcon from "@material-ui/icons/Done";
import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";
import { addColaborator, removeColaborator } from "./Service";

const emails = ["username@gmail.com", "user02@gmail.com"];
const styles = {
  avatar: {
    backgroundColor: blue[100],
    color: blue[600]
  }
};

class SimpleDialog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isChange: false,
      colaborator: "",
      colaboratorList: []
    };
  }

  handleClose = () => {
    this.props.onClose(this.props.selectedValue);
  };

  addColaborator = () => {
    let userName = this.state.colaborator;

    if (this.props.note) {
      console.log(this.props.note.title);

      this.setState({
        colaboratorList: this.state.colaboratorList.concat(userName)
      });
    } else {
      // this.state.getColaboratorData(userName)
      this.setState({
        colaboratorList: this.state.colaboratorList.concat(userName)
      });
    }
  };

  handleListItemClick = value => {
    this.props.onClose(value);
    if (this.props.note) {
      let token = localStorage.getItem("Token");
      let noteId = this.props.note.id;
      console.log(this.state.colaboratorList);

      addColaborator(noteId, this.state.colaboratorList, token)
        .then(Response => {
          console.log(Response);
          this.setState({
            colaborator: "",
            isChange: false
          });
          this.props.handleRefresh();
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      this.props.getColaboratorData(this.state.colaboratorList);
    }
  };

  removeColaborator = email => {
    let userName = email;
    if (this.props.note) {
      let noteId = this.props.note.id;
      let token = localStorage.getItem("Token");
      removeColaborator(noteId, userName, token)
        .then(Response => {
          console.log(Response);
          this.setState({
            colaborator: ""
          });
          this.props.handleRefresh();
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      let array = this.state.colaboratorList;
      var index = array.indexOf(userName);
      array.splice(index, 1);
      this.setState({
        colaboratorList: array
      });
    }
  };
  handleChange = event => {
    this.setState(
      {
        colaborator: event.target.value
      },
      () => {
        if (this.state.colaborator !== "") {
          this.setState({
            isChange: true
          });
        } else {
          this.setState({
            isChange: false
          });
        }
      }
    );
  };

  render() {
    const { classes, onClose, selectedValue, ...other } = this.props;

    return (
      <Dialog
        onClose={this.handleClose}
        aria-labelledby="simple-dialog-title"
        {...other}
        onClick={event => {
          event.nativeEvent.stopImmediatePropagation();
        }}
      >
        <DialogTitle id="simple-dialog-title">Add Colaborator</DialogTitle>
        <div style={{ width: 600 }}>
          <List>
            {this.props.note !== null && this.props.note !== undefined
              ? this.state.colaboratorList.map(
                  email => (
                    console.log("in colab List"),
                    (
                      <ListItem
                        button
                        onClick={() => this.handleListItemClick(email)}
                      >
                        <ListItemAvatar>
                          <Avatar className={classes.avatar}>
                            <PersonIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={email} />
                        <ListItemIcon
                          onClick={() => this.removeColaborator(email)}
                        >
                          <ClearIcon />
                        </ListItemIcon>
                      </ListItem>
                    )
                  )
                )
              : this.state.colaboratorList.map(email => (
                  <ListItem
                    button
                    onClick={() => this.handleListItemClick(email)}
                  >
                    <ListItemAvatar>
                      <Avatar className={classes.avatar}>
                        <PersonIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={email} />
                    <ListItemIcon onClick={() => this.removeColaborator(email)}>
                      <ClearIcon />
                    </ListItemIcon>
                  </ListItem>
                ))}

            <ListItem button>
              <ListItemAvatar>
                <Avatar>
                  <PersonAddIcon />
                </Avatar>
              </ListItemAvatar>
              <InputBase
                style={{ width: 470 }}
                placeholder="Person or email to share with"
                onChange={this.handleChange}
              />
              {this.state.isChange ? (
                <ListItemIcon onClick={this.addColaborator}>
                  <DoneIcon />
                </ListItemIcon>
              ) : null}
            </ListItem>
            <ListItem
              style={{
                backgroundColor: "#D4CBCB",
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end"
              }}
            >
              <Button onClick={() => this.handleListItemClick("addAccount")}>
                Cancel
              </Button>
              <Button onClick={() => this.handleListItemClick("addAccount")}>
                Save
              </Button>
            </ListItem>
          </List>
        </div>
      </Dialog>
    );
  }
}

SimpleDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func,
  selectedValue: PropTypes.string
};

const SimpleDialogWrapped = withStyles(styles)(SimpleDialog);
const OverRidedIconButton = withStyles({
  root: {
    padding: "4.7px"
  }
})(IconButton);
class SimpleDialogDemo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      selectedValue: emails[1]
    };
  }

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
        <OverRidedIconButton
          variant="outlined"
          onClick={this.handleClickOpen}
          aria-label="Add Colaborator"
        >
          <PersonAddOutlinedIcon />
        </OverRidedIconButton>
        {this.props.note ? (
          <SimpleDialogWrapped
            selectedValue={this.state.selectedValue}
            open={this.state.open}
            onClose={this.handleClose}
            note={this.props.note}
            handleRefresh={this.props.handleRefresh}
          />
        ) : (
          <SimpleDialogWrapped
            selectedValue={this.state.selectedValue}
            open={this.state.open}
            onClose={this.handleClose}
            getColaboratorData={this.props.getColaboratorData}
          />
        )}
      </div>
    );
  }
}

export default SimpleDialogDemo;
