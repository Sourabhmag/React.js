import React from "react";
import "./MyStyles.css";

function StyleSheets(props) {
    let className=this.props.primary ? 'primary':''
  return (
    <div>
      <h1 className={className}>StyleSheets</h1>
    </div>
  );
}

export default StyleSheets;
