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
      colaborator: ""
    };
  }

  handleClose = () => {
    this.props.onClose(this.props.selectedValue);
  };

  addColaborator = () => {
    let noteId = this.props.note.id;
    let userName = this.state.colaborator;
    let token = localStorage.getItem("Token");
    addColaborator(noteId, userName, token)
      .then(Response => {
        console.log(Response);
        this.setState({
          colaborator: "",
          isChange:false
        });
        this.props.handleRefresh();
      })
      .catch(err => {
        console.log(err);
      });
  };

  removeColaborator = email => {
    let noteId = this.props.note.id;
    let userName = email;
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
  handleListItemClick = value => {
    this.props.onClose(value);
  };

  render() {
    const { classes, onClose, selectedValue, ...other } = this.props;
    console.log(this.props);

    return (
      <Dialog
        onClose={this.handleClose}
        aria-labelledby="simple-dialog-title"
        {...other}
      >
        <DialogTitle id="simple-dialog-title">Add Colaborator</DialogTitle>
        <div style={{ width: 600 }}>
          <List>
            {this.props.note.colaborators.map(email => (
              <ListItem
                button
                onClick={() => this.handleListItemClick(email)}
                key={email}
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
        <SimpleDialogWrapped
          selectedValue={this.state.selectedValue}
          open={this.state.open}
          onClose={this.handleClose}
          note={this.props.note}
          handleRefresh={this.props.handleRefresh}
        />
      </div>
    );
  }
}

export default SimpleDialogDemo;
