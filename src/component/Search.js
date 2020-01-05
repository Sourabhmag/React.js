import React, { Component } from "react";
import { getNotes, search } from "./Service";
import NoteService from "./NoteService";

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = { array: [] };
  }

  getAllNotes = () => {
    console.log(this.props);
    
    console.log(this.props.location.state.searchArray);

    this.setState({
      array: this.props.location.state.searchArray
    });
  };

  UNSAFE_componentWillMount() {
    this.getAllNotes();
  }
  render() {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className="noteCards">
          {this.state.array.map((value, index) => (
            <div style={{ padding: 7 }}>
              <NoteService
                note={this.state.array[index]}
                array={this.state.array}
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
