import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";

const styles = {
  bigAvatar: {
    padding:0,
    margin: 20,
    width: 90,
    height: 90
  }
};

function ImageAvatars(props) {
  let name = localStorage.getItem("name");
  let profilePic = localStorage.getItem("profilePic");

  const { classes } = props;
  return (
    <Grid container justify="center" alignItems="center">
      <Avatar alt={name} src={profilePic} className={classes.bigAvatar} />
    </Grid>
  );
}

ImageAvatars.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ImageAvatars);
