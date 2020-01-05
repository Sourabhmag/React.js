import React from "react";
import Popover from "@material-ui/core/Popover";
import ProfileAvatar from "./ProfileAvatar";
import { withStyles } from "@material-ui/styles";
import { IconButton } from "@material-ui/core";
import ProfilePopper from "./ProfilePopper";
import "../CssFiles/ProfPopoverButton.css";

const OverrideProfileAvatar = withStyles({
  bigAvatar: {
      padding:0,
    margin: 0,
    width: 30,
    height: 30
  }
})(ProfileAvatar);


export default function SimplePopover(props) {
  
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
// const handelSignout=()=>{
//     this.props.props.history.push("/")
// }
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <IconButton
        aria-describedby={id}
        variant="contained"
        color="primary"
        onClick={handleClick}
      >
        <OverrideProfileAvatar />
      </IconButton>

     
      <Popover
        id={id}
        style={{top:"2%"}}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
      >
          {/* {classes.typography} */}
        <div className="popover">
         <ProfilePopper DashboardProps={props.DashboardProps}/>
        </div>
      </Popover>
    </div>
  );
}
