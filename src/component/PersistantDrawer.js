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

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: "flex"
  },
  //   appBar: {
  //     transition: theme.transitions.create(["margin", "width"], {
  //       easing: theme.transitions.easing.sharp,
  //       duration: theme.transitions.duration.leavingScreen
  //     })
  //   },
  //   appBarShift: {
  //     width: `calc(100% - ${drawerWidth}px)`,
  //     marginLeft: drawerWidth,
  //     transition: theme.transitions.create(["margin", "width"], {
  //       easing: theme.transitions.easing.easeOut,
  //       duration: theme.transitions.duration.enteringScreen
  //     })
  //   },
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
      labelArray: []
    };
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
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
  }
  render() {
    const { classes } = this.props;
    const { open } = this.state;

    return (
      <div>
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
                  button
                  style={{
                    borderTopRightRadius: "20px",
                    borderBottomRightRadius: "20px"
                  }}
                  onClick={this.props.handelNoteClick}
                >
                  <ListItemIcon>
                    <NoteIcon />
                  </ListItemIcon>
                  <ListItemText primary="Notes" />
                </ListItem>
                <ListItem
                  button
                  style={{
                    borderTopRightRadius: "20px",
                    borderBottomRightRadius: "20px"
                  }}
                  onClick={this.props.handelReminderClick}
                >
                  <ListItemIcon>
                    <ReminderIcon />
                  </ListItemIcon>
                  <ListItemText primary="Reminder" />
                </ListItem>
              </List>
              <Divider></Divider>
              <Typography style={{ paddingTop: "6%",paddingRight:"65%" }}>
                Labels
              </Typography>
              <List>
                {this.state.labelArray.map(label => (
                  <ListItem
                    button
                    key="label"
                    style={{
                      borderTopRightRadius: "20px",
                      borderBottomRightRadius: "20px",

                    }}
                  >
                    <ListItemIcon>
                      <LabelOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary={label.title} />
                   
                  </ListItem>
                ))}

                <ListItem
                  button
                  style={{
                    borderTopRightRadius: "20px",
                    borderBottomRightRadius: "20px"
                  }}
                >
                  <ListItemIcon>
                    <EditOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Edit label" />
                </ListItem>
              </List>
              <Divider></Divider>
              <List>
                <ListItem
                  button
                  style={{
                    borderTopRightRadius: "20px",
                    borderBottomRightRadius: "20px"
                  }}
                  onClick={this.props.handelArchiveClick}
                >
                  <ListItemIcon>
                    <ArchiveOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Archive" />
                </ListItem>
                <ListItem
                  button
                  style={{
                    borderTopRightRadius: "20px",
                    borderBottomRightRadius: "20px"
                  }}
                  onClick={this.props.handelTrashClick}
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
      </div>
    );
  }
}

PersistentDrawerLeft.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(PersistentDrawerLeft);
