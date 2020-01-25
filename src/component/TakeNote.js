import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import CheckBoxOutlinedIcon from "@material-ui/icons/CheckBoxOutlined";
import IconButton from "@material-ui/core/IconButton";
import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";
import BrushOutlinedIcon from "@material-ui/icons/BrushOutlined";
import "../CssFiles/takeNote.css";

const styles = {
  root: {
    // padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    border:"12px"
  },
  input: {
    flex: 1
  },
  iconButton: {
    padding: 8
   
  },
 
};

function CustomizedInputBase(props) {
  const { classes } = props;
  return (
    
    <Paper className={classes.input} onClick={props.openEditer} >
      {/* <Typography className={classes.input}>Take a note...</Typography> */}

      
        <div className="takeNote">
          <div className="inputBase">
            <InputBase
             className={classes.input}
             
              placeholder="Take a note..."
            />
            
          </div>
          
          <div>
            <IconButton className={classes.iconButton} aria-label="Search">
              <CheckBoxOutlinedIcon />
            </IconButton>

            <IconButton aria-label="Directions">
              <BrushOutlinedIcon />
            </IconButton>
            <IconButton aria-label="Directions">
              <ImageOutlinedIcon />
            </IconButton>
          </div>
        </div>
      
    </Paper>
    

  );
}

CustomizedInputBase.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CustomizedInputBase);
