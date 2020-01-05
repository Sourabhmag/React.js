import React, { Component } from "react";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Popper from "@material-ui/core/Popper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";
import { IconButton } from "@material-ui/core";
import MoreVertOutlinedIcon from "@material-ui/icons/MoreVertOutlined";
  
const OverRidedIconButton = withStyles({
  root: {
    padding: "4.7px"
  }
})(IconButton);
const styles = theme => ({
  root: {
    width: 500
  },
  typography: {
    padding: theme.spacing.unit * 2
  }
});
class SettingPopper extends Component {
  state = {
    anchorEl: null,
    open: false,
    placement: null
  };

  handleClick = placement => event => {
    const { currentTarget } = event;
    this.setState(state => ({
      anchorEl: currentTarget,
      open: state.placement !== placement || !state.open,
      placement
    }));
  };
  render() {
    const { classes } = this.props;
    const { anchorEl, open, placement } = this.state;
    return (
      <div>
        <Popper
          open={open}
          anchorEl={anchorEl}
          placement={placement}
          transition
        >
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <Paper style={{ padding: 14 }}>
                <OverRidedIconButton aria-label="more">
                  <MoreVertOutlinedIcon />
                </OverRidedIconButton>

                <Typography style={{ padding: 4 }}>Delete note</Typography>
                <Typography style={{ padding: 4 }}>Add label</Typography>
                <Typography style={{ padding: 4 }}>Add drawing</Typography>
                <Typography style={{ padding: 4 }}>Make a copy</Typography>
                <Typography style={{ padding: 4 }}>Show checkboxes</Typography>
                <Typography style={{ padding: 4 }}>
                  Copy to Google Docs
                </Typography>
              </Paper>
            </Fade>
          )}
        </Popper>

        <Grid container justify="center">
          <Grid item>
            <Button onClick={this.handleClick("bottom")}>bottom</Button>
            <Button onClick={this.handleClick("bottom-end")}>bottom-end</Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default SettingPopper;
