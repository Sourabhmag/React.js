import React, { Component } from "react";
import { getNoteByLabelId } from "./Service";
import "../CssFiles/dashBoard.css";
import NoteService from "./NoteService";
import { Typography } from "@material-ui/core";

export class NoteWithLabel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      array: []
    };
  }

  getAllNotesByLabel = () => {
    let labelId = this.props.location.state.labelObj.id;
    let token = localStorage.getItem("Token");
    getNoteByLabelId(labelId, token).then(Response => {
      console.log(Response.data);
      this.setState({
        array: Response.data.data
      });
    }).catch((err) => {
      console.log(err)
      this.setState({
        array:null
      })
    })  
  };

  componentWillMount() {
    this.getAllNotesByLabel();
  }
  componentDidUpdate(prevProps) {
    console.log(prevProps);
    console.log(this.props);
    
    
    if (
      this.props.location.state.labelObj.id !==
      prevProps.location.state.labelObj.id
    ) {
      this.getAllNotesByLabel();
    }
  }
  render() {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className="noteCards">
          {this.state.array !== null && this.state.array !== undefined ? (
            this.state.array.map((value, index) => (
              <div style={{ padding: 7 }}>
                <NoteService
                  note={this.state.array[index]}
                  array={this.state.array}
                  handleRefresh={this.getAllNotesByLabel}
                />
              </div>
            ))
          ) : (
            <Typography style={{fontSize:20,marginLeft:250}}>No notes found for this label</Typography>
          )}
        </div>
      </div>
    );
  }
}

export default NoteWithLabel;
