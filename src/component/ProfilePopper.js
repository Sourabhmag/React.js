import React, { Component } from "react";
import ProfileAvatar from "../component/ProfileAvatar";
import { Button, Typography, Badge } from "@material-ui/core";
import "../CssFiles/profilePopper.css";
import EditProfilePic from "./EditProfilePic";
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import { withStyles } from "@material-ui/core/styles";
const OverRidedBadge = withStyles({
  anchorOriginBottomRightCircle:{
    marginBottom:9,
    marginRight:7
  }
})(Badge);
class ProfilePopper extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    };
  }
  handleClickOpen = () => {
    this.setState(
      {
        open: true
      },
      () => {
        console.log(this.state.open);
      }
    );
  };

  handleClickClose = () => {
    this.setState({
      open: false
    });
  };
  handleSignOut = () => {
    console.log(this.props);
    localStorage.clear();
    this.props.DashboardProps.props.history.push("/");
  };

  render() {
    return (
      <>
        <div className="profilePopper">
          <div>
            <OverRidedBadge
              overlap="circle"
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right"
              }}
              badgeContent={
                <CameraAltIcon
                  style={{ backgroundColor: "white", borderRadius: "50%" }}
                  onClick={this.handleClickOpen}
                />
              }
            >
              <ProfileAvatar />
            </OverRidedBadge>

           
          </div>
          
          <div>
            <Typography>{localStorage.getItem("name")}</Typography>
            <div style={{ color: "gray", fontSize: 10 }}>
              <Typography>{localStorage.getItem("email")}</Typography>
            </div>
          </div>

          <div>
            <Typography>
              <Button variant="inherit" color="primary">
                Manage your Fundoo Account
              </Button>
            </Typography>
          </div>
          <div>
            <Typography>
              <Button
                variant="inherit"
                color="primary"
                onClick={this.handleSignOut}
              >
                Sign out
              </Button>
            </Typography>
          </div>
        </div>
        {this.state.open ? (
          <EditProfilePic
            handleClose={this.handleClickClose}
            open={this.state.open}
          />
        ) : null}
      </>
    );
  }
}

export default ProfilePopper;
