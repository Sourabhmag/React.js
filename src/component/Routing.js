import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./Login";
import PasswordReset from "./PasswordReset";
import Registeration from "./Registeration";
import Dashboard from "./Dashboard";
import Trash from "./Trash";
import TakeNoteWithTitle from "./TakeNoteWithTitle";
import ForgotPassword from "./ForgotPassword";
import Note from "./Note";
import Archive from "./Archive";
import Search from "./Search";
import NoteWithLabel from "./NoteWithLabel";
import ShowReminder from "./ShowReminder";
import AddColaboratorDialog from "./AddColaboratorDialog"

class Routing extends Component {
  render() {
    return (
      <div>
        <Router>
          <Route path="/" exact={true} component={Login} />
          <Route path="/register" component={Registeration} />
          <Route path="/forgotPassword" component={ForgotPassword} />
          <Route path="/resetPassword/:token" component={PasswordReset} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/dashboard/note" component={Note} />
          <Route path="/takeNote" component={TakeNoteWithTitle} />
          <Route path="/dashboard/trash" component={Trash} />
          <Route path="/dashboard/archive" component={Archive} />
          <Route path="/dashboard/search" component={Search} />
          <Route path="/dashboard/reminder" component={ShowReminder} />
          <Route
            path="/dashboard/noteWithLabel/:label"
            component={NoteWithLabel}
          />
          <Route path="/trash" component={AddColaboratorDialog} />
        </Router>
      </div>
    );
  }
}

export default Routing;
