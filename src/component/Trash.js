import React, { Component } from "react";
import TrashCard from "./TrashCard";
import { getNotes } from "./Service";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    view: state.view,
    drawerPosition:state.drawerPosition
  };
};

class Trash extends Component {
  constructor(props) {
    super(props);

    this.state = {
      array: []
    };
  }

  getAllNotes = () => {
    getNotes(localStorage.getItem("Token")).then(Response => {
      let trashArray = Response.data.data.filter(note => note.trash === true);
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
      <div style={{marginLeft:this.props.drawerPosition?"20%":0}}>
        <div
          style={{ display: "flex", justifyContent: "center", marginTop: "8%" }}
        >
          <div className="noteCards">
            {this.state.array.map((value, index) => (
              <div style={{ padding: 7 }}>
                <TrashCard
                  note={this.state.array[index]}
                  handleRefresh={this.handleRefresh}
                  isGrid={this.props.location.state.isGrid}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Trash);
