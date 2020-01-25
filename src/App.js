import React from "react";
import "./App.css";
import Routing from "./component/Routing";
import { Provider } from "react-redux";
import Store from "./Redux/Store";

function App() {
  return (
    <Provider store={Store}>
      
        <Routing />

    </Provider>
  );
}

export default App;
