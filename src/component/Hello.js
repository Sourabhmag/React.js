import React, { Component } from "react";
const Hello = props => {
  console.log(props);
  return (
    <div>
      <h1>
        Hello &nbsp;
        {props.name} &nbsp;
        {props.heroName}
      </h1>
      {props.children}
    </div>
  )
}

export default Hello;
