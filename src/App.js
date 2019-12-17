import React from "react";
//import logo from "./logo.svg";
import "./App.css";
import Login from "./component/Login";
import ForgotPassword from "./component/ForgotPassword";
import PasswordField from "./component/PasswordField";
import InField from "./component/InField";
import PasswordReset from "./component/PasswordReset";
import Registeration from "./component/Registeration"
import { BrowserRouter as Router, Route } from "react-router-dom";
// import Hello from "./component/Hello";
// import Sourabh from "./component/Sourabh.js"
// import Message from "./component/Message"
// import Counter from "./component/Counter"
// import EventBinding from "./component/EventBinding"
// import ParentComponent from "./component/ParentComponent";
// import StyleSheets from "./component/StyleSheets";

function App() {
  return (
    <div className="App">
      <Router>
        <switch>
          <Route path="/" exact={true} component={Login} />
          <Route path="/register" component={Registeration} />
        </switch>
      </Router>
     {/* <Registeration/> */}
      {/* <PasswordReset/> */}
      {/* <ForgotPassword/> */}
      
      {/* <Login/> */}
      
    </div>
  );
}

export default App;
