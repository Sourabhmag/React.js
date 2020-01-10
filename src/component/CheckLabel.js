import React, { Component } from "react";
import { Checkbox, Typography } from "@material-ui/core";

export class CheckLabel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checkedF: true
    };
  }

  handleChange = () => {
    this.setState({
    checkedF:!this.state.checkedF
    });
   
  };

  // handleTick = () => {
  //   this.props.note1.labelList.forEach(label => {
  //     if (label.id === this.props.label.id) {
  //       console.log("in If");
  //       this.setState({
  //           checkedF:false
  //       })
  //     } else {
  //       console.log("in Else");
  //       this.setState({
  //           checkedF:true
  //       })
  //     }
  //   });
  // };

  componentWillMount(){
    this.setState({
      checkedF:this.props.isCheckedF
    })
    // this.props.note1.labelList.forEach(label => {
    //     console.log("for each start...");
    //     console.log(label.id + " "+this.props.label.id);
    //     console.log("title:",label.title);
        
    //     if (label.id === this.props.label.id) {
    //       console.log("in If");
    //       this.setState({
    //           checkedF:true
    //       })

          
    //     } else {
    //       console.log("in Else");
    //       this.setState({
    //         checkedF:false
    //     })

    //     }
    //   });
  }
  render() {
    return (
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Checkbox
            // value={false}
          checked={this.props.isCheckedF}
            // checked={}
          // ("checkedF")
          onChange={this.handleChange}
        />
        <Typography style={{ paddingLeft: 5, fontSize: 15, paddingTop: 10 }}>
          {this.props.label.title}
        </Typography>
      </div>
    );
  }
}

export default CheckLabel;
