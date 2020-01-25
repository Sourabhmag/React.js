import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import NoteIcon from "@material-ui/icons/EmojiObjectsOutlined";
import ReminderIcon from "@material-ui/icons/NotificationsOutlined";
import LabelOutlinedIcon from "@material-ui/icons/LabelOutlined";
import ArchiveOutlinedIcon from "@material-ui/icons/ArchiveOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import { getLabels } from "./Service";
import EditLabelPopover from "./EditLabelPopover";
import { drawer_toggle } from "../Redux/Action";
import { connect } from "react-redux";
import "../CssFiles/persistantDrawer.css"
const mapStateToProps = state => {
  return {
    drawerPosition: state.drawerPosition
  };
};

const mapDispatchToProps = dispatch => {
  return {
    drawer_toggle: () => dispatch(drawer_toggle())
  };
};
const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: "flex"
  },

  menuButton: {
    marginLeft: 0,
    marginRight: 0,
    padding: 0
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth,
    top: "80px"
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
  content: {
    flexGrow: 1,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: -drawerWidth
  }
});

class PersistentDrawerLeft extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      labelArray: [],
      openEditLabel: false
    };
  }

  handleDrawerOpen = () => {
    this.setState({ open: true }, () => {
      this.props.drawer_toggle();
    });
  };

  handleDrawerClose = () => {
    this.setState({ open: false }, () => {
      this.props.drawer_toggle();
    });
  };

  handleClickOpenEditLabel = () => {
    this.setState({
      openEditLabel: true
    });
  };

  handleCloseEditLabel = value => {
    this.setState({ openEditLabel: false });
  };

  getAllLabels = () => {
    getLabels(localStorage.getItem("Token")).then(Response => {
      this.setState({
        labelArray: Response.data.data
      });
      let array = this.state.labelArray.reverse();
      this.setState({
        labelArray: array
      });
    });
  };

  UNSAFE_componentWillMount() {
    this.getAllLabels();
  }
  render() {
    const { classes } = this.props;
    const { open } = this.state;
    console.log(this.props.drawerPosition);

    return (
      <div className={classes.root}>
        <CssBaseline />

        <IconButton
          disableGutters={!open}
          color="inherit"
          aria-label="Open drawer"
          onClick={open ? this.handleDrawerClose : this.handleDrawerOpen}
        >
          <MenuIcon />
        </IconButton>

        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <Divider />
          <div>
            <List>
              <ListItem
              className="over"
                button
                style={{
                  borderTopRightRadius: "20px",
                  borderBottomRightRadius: "20px"
                }}
                onClick={() => this.props.handelNoteClick(this.props.isGrid)}
              >
                <ListItemIcon>
                  <NoteIcon />
                </ListItemIcon>
                <ListItemText primary="Notes" />
              </ListItem>
              <ListItem
              className="over"
                button
                style={{
                  borderTopRightRadius: "20px",
                  borderBottomRightRadius: "20px"
                }}
                onClick={() =>
                  this.props.handelReminderClick(this.props.isGrid)
                }
              >
                <ListItemIcon>
                  <ReminderIcon />
                </ListItemIcon>
                <ListItemText primary="Reminder" />
              </ListItem>
            </List>
            <Divider></Divider>
            <Typography style={{ paddingTop: "6%", paddingRight: "65%" }}>
              Labels
            </Typography>
            <List>
              {this.state.labelArray.map(labelObject => (
                <ListItem
                className="over"
                  button
                  // key="label"
                  style={{
                    borderTopRightRadius: "20px",
                    borderBottomRightRadius: "20px"
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row"
                    }}
                    onClick={() =>
                      this.props.handelLabelsClick(
                        labelObject,
                        this.props.isGrid
                      )
                    }
                  >
                    <ListItemIcon style={{ paddingTop: 3 }}>
                      <LabelOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary={labelObject.title} />
                  </div>
                </ListItem>
              ))}

              <ListItem
              className="over"
                button
                style={{
                  borderTopRightRadius: "20px",
                  borderBottomRightRadius: "20px"
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row"
                  }}
                  onClick={this.handleClickOpenEditLabel}
                >
                  <ListItemIcon style={{ paddingTop: 4 }}>
                    <EditOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Edit label" />
                </div>

                {this.state.openEditLabel ? (
                  <div>
                    <EditLabelPopover
                      getAllLabels={this.getAllLabels}
                      open={this.state.openEditLabel}
                      onClose={this.handleCloseEditLabel}
                    />
                  </div>
                ) : null}
              </ListItem>
            </List>
            <Divider></Divider>
            <List>
              <ListItem
              className="over"
                button
                style={{
                  borderTopRightRadius: "20px",
                  borderBottomRightRadius: "20px"
                }}
                onClick={() => this.props.handelArchiveClick(this.props.isGrid)}
              >
                <ListItemIcon>
                  <ArchiveOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Archive" />
              </ListItem>
              <ListItem
              className="over"
                button
                style={{
                  borderTopRightRadius: "20px",
                  borderBottomRightRadius: "20px"
                }}
                onClick={() => this.props.handelTrashClick(this.props.isGrid)}
              >
                <ListItemIcon>
                  <DeleteOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Trash" />
              </ListItem>
            </List>
          </div>
        </Drawer>
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: open
          })}
        >
          <div className={classes.drawerHeader} />
        </main>
      </div>
    );
  }
}

PersistentDrawerLeft.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(PersistentDrawerLeft));
