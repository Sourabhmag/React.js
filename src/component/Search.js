import React, { Component } from "react";
import { getNotes, search } from "./Service";
import NoteService from "./NoteService";

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = { array: [] };
  }

  
  render() {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className="noteCards">
          {this.props.location.state.searchArray.map((value, index) => (
            <div style={{ padding: 7 }}>
              <NoteService
                note={this.props.location.state.searchArray[index]}
                array={this.props.location.state.searchArray}
                handleRefresh={this.handleRefresh}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Search;
