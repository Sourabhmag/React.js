import React from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        // console.log("localStorage:",localStorage);
        if (localStorage.getItem("Token")) {
            console.log("in if of protected Route");
            
          return <Component {...props} />;
        } //end of if
        else {
          return (
            <Redirect
              to={{
                pathname: "/",
                state: {
                  from: props.location
                }
              }} //end of to
            />
          );
        } //end of else
      }}
    />
  );
}; //end of ProtectedRoute

export default ProtectedRoute;
