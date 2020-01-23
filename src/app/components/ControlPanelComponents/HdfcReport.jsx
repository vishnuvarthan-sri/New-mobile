import React, { Component } from "react";
import DatePicker from "react-datepicker";
import { Segment, Label } from "semantic-ui-react";

import "react-datepicker/dist/react-datepicker.css";

export class HdfcReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fromDate: new Date(),
      toDate: new Date()
    };
  }
  handleFromDate = date => {
    this.setState({
      fromDate: date
    });
  };
  handleToDate = date => {
    this.setState({
      toDate: date
    });
  };
  render() {
    return (
      <div>
        <Segment padded style={{width:"800px",marginLeft:"50%",marginTop:"10%"}}>
          <div>
            <Label style={{ display: "inline-block"}}>From</Label>
            <DatePicker
              selected={this.state.fromDate}
              onChange={this.handleFromDate}
              style = {{display:"inline-block",marginLeft:40,position:"fixed"}}
            />


          {/* </div> */}
          {/* <div style={{display:"inline-block",marginLeft:"50px"}}> */}
            <Label style={{ display: "inline-block",marginLeft:"20px" }}>To</Label>
            <DatePicker
              selected={this.state.toDate}
              onChange={this.handleToDate}
              style = {{display:"inline-block",padding:"20px"}}
            />
          </div>
        </Segment>
      </div>
    );
  }
}

export default HdfcReport;
