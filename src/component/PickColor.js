import React, { Component } from "react";
import { Paper, Tooltip } from "@material-ui/core";
import { addColor } from "./Service";
const colorsPallete = [
  {
    colorName: "White",
    colorCode: "#ffffff"
  },
  {
    colorName: "Red",
    colorCode: "#ea2e2e"
  },
  {
    colorName: "Orange",
    colorCode: "#ffb600"
  },
  {
    colorName: "Yellow",
    colorCode: "#e1e82e"
  },
  {
    colorName: "Green",
    colorCode: "#ccff90"
  },
  {
    colorName: "Teal",
    colorCode: "#a7ffeb"
  },
  {
    colorName: "Blue",
    colorCode: "#281bd6"
  },
  {
    colorName: "Dark blue",
    colorCode: "#aecbfa"
  },
  {
    colorName: "Purple",
    colorCode: "#d7adfb"
  },
  {
    colorName: "Pink",
    colorCode: "#fdcfe8"
  },
  {
    colorName: "Dark Brown",
    colorCode: "#e6c9a7"
  },
  {
    colorName: "Gray",
    colorCode: "#e8eaed"
  }
];
class PickColor extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  handleColor = color => {
    let noteId = this.props.note.id
    let colorOfNote = color.colorCode 
    let token = localStorage.getItem("Token")
    console.log(colorOfNote);
    console.log(noteId);
    console.log(token);
    addColor(colorOfNote,noteId,token).then(Response => {
      console.log('kkkk',Response);
      this.props.handleRefresh();
    })
    .catch((err)=>{
      console.log('error',err);
      
    })
  };

  render() {
    return (
      <div>
        <Paper
          style={{
            width: 120,
            display: "flex",
            justifyContent: "row",
            flexWrap: "wrap",
           
          }}
        >
          
            {colorsPallete.map(color => {
              return (
                <Tooltip title={color.colorName}>
                  <div
                    onClick={() => this.handleColor(color)}
                    style={{
                      height: "30px",
                      width: "30px",
                      borderRadius: "50%",
                      backgroundColor: color.colorCode,
                      cursor: "pointer"
                    }}
                  ></div>
                </Tooltip>
              );
            })}
         
        </Paper>
      </div>
    );
  }
}

export default PickColor;
