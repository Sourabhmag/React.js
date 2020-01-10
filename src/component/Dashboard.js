import React, { Component } from "react";
import "../CssFiles/dashBoard.css";
import { getNotes } from "./Service";
import Appbar from "./Appbar";

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      grid: false,
      noteEditer: false,
      title: "",
      description: "",
      isChange: false,

      array: [],
      openEditNote: false,
      allnotes: true,
      archive: false,
      trash: false,
      labels: false,
      reminder: false
    };
  }

  handelNoteClick = () => {
    this.setState({
      allnotes: true,
      archive: false,
      trash: false,
      labels: false,
      reminder: false
    });

    this.props.history.push({
      pathname: "/dashboard/note",
      state: { array: this.state.array }
    });
  };

  handelArchiveClick = () => {
    this.setState({
      allnotes: false,
      archive: true,
      trash: false,
      labels: false,
      reminder: false
    });
    let archiveArray = this.state.array.filter(
      note => note.archive === true && note.trash !== true
    );
    this.props.history.push({
      pathname: "/dashboard/archive",
      state: { array: archiveArray }
    });
  };
  handelTrashClick = event => {
    this.setState({
      allnotes: false,
      archive: false,
      trash: true,
      labels: false,
      reminder: false
    });
    this.props.history.push("/dashboard/trash");
  };

  handelReminderClick = () => {
    this.setState({
      allnotes: false,
      archive: false,
      trash: false,
      labels: false,
      reminder: true
    });
    this.props.history.push("/dashboard/reminder")
  };

  handelLabelsClick = labelObject => {
    this.setState({
      allnotes: false,
      archive: false,
      trash: false,
      labels: true,
      reminder: false
    });
    this.props.history.push({
      pathname: "/dashboard/noteWithLabel/"+labelObject.title,
      state: { labelObj: labelObject }
    });
  };

  isChangeTrue = () => {
    this.setState({
      isChange: true
    });
  };

  isChangeFalse = () => {
    this.setState({
      isChange: false
    });
  };

  handleChangeView = () => {
    this.setState(state => ({ grid: !state.grid }));
  };

  getAllNotes = () => {
    console.log("in getAllNotes");

    getNotes(localStorage.getItem("Token")).then(Response => {
      this.setState({
        array: Response.data.data
      });
    });
  };

  UNSAFE_componentWillMount() {
    this.getAllNotes();
  }

  render() {
    return (
      <div position="relative">
        <Appbar
          props={this.props}
          array={this.state.array}
          handelNoteClick={this.handelNoteClick}
          handelReminderClick={this.handelReminderClick}
          handelArchiveClick={this.handelArchiveClick}
          handelTrashClick={this.handelTrashClick}
          handelLabelsClick={this.handelLabelsClick}
        />
      </div>
    );
  }
}

export default Dashboard;
