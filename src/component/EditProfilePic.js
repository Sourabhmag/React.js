import React from "react";
import "../CssFiles/editNote.css";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import "../CssFiles/editProfilePic.css";
import { Typography } from "@material-ui/core";
import { uploadImage } from "./Service";

export default class SimpleDialog extends React.Component {
  constructor(props) {
    super(props);

    this.state = { uploadedFile: null };
  }
  onChangeHandler = event => {
    console.log(event.target.files[0]);

    this.setState({
      uploadedFile: event.target.files[0]
    });
  };

  uploadProfilePic = () => {
    let token = localStorage.getItem("Token");
    const formdata = new FormData();
    formdata.append('file',this.state.uploadedFile,this.state.uploadedFile.name)
    uploadImage(token,formdata).then(Response => {
      console.log(Response);
      localStorage.removeItem("profilePic");
     localStorage.setItem("profilePic",Response.data.data);
    });
    this.props.handleClose();
  };
  render() {
    return (
      <Dialog
        onClose={this.props.handleClose}
        aria-labelledby="simple-dialog-title"
        open={this.props.open}
      >
        <div className="mainDialog">
          <div className="SelectText">
            <Typography style={{ fontSize: 30 }}>
              Select profile photo
            </Typography>
          </div>
          <div className="profilepic">
            <input
              variant="contained"
              color="inherit"
              type="file"
              name="file"
              onChange={this.onChangeHandler}
            />
          </div>
          <div className="buttonsOfDialogBox">
            <div>
              <Button
                variant="contained"
                color="primary"
                onClick={this.uploadProfilePic}
              >
                <Typography>Set a Profile Photo</Typography>
              </Button>
            </div>
            <div>
              <Button
                variant="contained"
                color="secondary"
                onClick={this.props.handleClose}
              >
                <Typography>Close</Typography>
              </Button>
            </div>
          </div>
        </div>
      </Dialog>
    );
  }
}
