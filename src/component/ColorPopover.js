import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ColorLensOutlinedIcon from "@material-ui/icons/ColorLensOutlined";
import Popover from "@material-ui/core/Popover";
import PickColor from "./PickColor";
import { IconButton } from "@material-ui/core";

const OverRidedIconButton = withStyles({
  root: {
    padding: "4.7px"
  }
})(IconButton);
const styles = theme => ({
  typography: {
    margin: theme.spacing.unit * 2
  }
});

class SimplePopover extends React.Component {
  state = {
    anchorEl: null
  };

  handleClick = event => {
    this.setState({
      anchorEl: event.currentTarget
    });
  };

  handleClose = () => {
    this.setState({
      anchorEl: null
    });
  };

  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div>
        <OverRidedIconButton
          aria-owns={open ? "simple-popper" : undefined}
          aria-haspopup="true"
          variant="contained"
          onMouseEnter={this.handleClick}
          aria-label="color"
        >
          <ColorLensOutlinedIcon />
        </OverRidedIconButton>

        <Popover
          id="simple-popper"
          open={open}
          anchorEl={anchorEl}
          onClose={this.handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left"
          }}
          transformOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          onClick={event => {
            event.nativeEvent.stopImmediatePropagation();
          }}
        >
          {this.props.note !== null && this.props.note !== undefined ? (
            <PickColor
              note={this.props.note}
              handleRefresh={this.props.handleRefresh}
            />
          ) : (
            <PickColor getColorData={this.props.getColorData} />
          )}
        </Popover>
      </div>
    );
  }
}

SimplePopover.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimplePopover);
