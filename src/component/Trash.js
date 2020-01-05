import React, { Component } from "react";
import TrashCard from "./TrashCard";
import { getNotes } from "./Service";

class Trash extends Component {
  constructor(props) {
    super(props)

    this.state = {
         array:[]
    }
}

getAllNotes = () => {

getNotes(localStorage.getItem("Token")).then(Response => {
  let trashArray = Response.data.data.filter(note=>note.trash===true)
  this.setState({
    array: trashArray
  });
});
};

UNSAFE_componentWillMount() {
this.getAllNotes();
}
handleRefresh = () => {
  console.log("Call to handleRefresh");

  this.getAllNotes();
};
  render() {
    return (
      <div style={{display:"flex",flexWrap:"wrap",width:800}}>
        {this.state.array.map((value, index) => (
          <div style={{ padding: 7 }}>
            <TrashCard note={this.state.array[index]} handleRefresh={this.handleRefresh}/>
          </div>
        ))}
      </div>
    );
  }
}

export default Trash;
