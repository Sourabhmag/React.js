import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";

const styles = theme => ({
  close: {
    padding: theme.spacing.unit / 2
  }
});

class ConsecutiveSnackbars extends React.Component {
  render() {
    return (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right"
          }}
          open={this.props.openSnackBar}
          autoHideDuration={6000}
          onClose={this.props.handleCloseSnackbar}
          message={this.props.messageInfo}
        />
      </div>
    );
  }
}

ConsecutiveSnackbars.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ConsecutiveSnackbars);
