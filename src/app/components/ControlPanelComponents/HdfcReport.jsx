import React, { Component } from "react";
import DatePicker from "react-datepicker";
import {
  Segment,
  Label,
  Grid,
  Button,
  Header,
  Container,
  Step,Icon
} from "semantic-ui-react";

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
    
        <Container style={{marginTop:"3%"}}>
          <Step.Group fluid style={{backgroundColor:"teal"}}>
            <Step>
			<Icon name='arrow alternate circle right' />
              <label for="from"><span style={{fontSize:"15px",fontWeight:"bold"}}>From</span></label>
			  <hr/>
              <DatePicker
                selected={this.state.fromDate}
				onChange={this.handleFromDate}
				placeholderText="Choose From Date"
              />
            </Step>
            <Step>
			
			<label for="to"><span style={{fontSize:"15px",fontWeight:"bold"}}>To</span></label>
			  <hr/>
              <DatePicker
                selected={this.state.toDate}
				onChange={this.handleToDate}
				placeholderText="Choose End Date"
              />
			  <Icon style={{marginLeft:"15px"}} name='arrow alternate circle left' />
            </Step>
			<Step>
              <Button primary>Download Report</Button>
            </Step>
            
          </Step.Group>
        </Container>
      
    );
  }
}

export default HdfcReport;

// {/* <Segment padded style={{width:"800px",marginLeft:"50%",marginTop:"10%"}}>
// <div>
//   <Label style={{ display: "inline-block"}}>From</Label>
{
  /* <DatePicker
  selected={this.state.fromDate}
  onChange={this.handleFromDate}
  style = {{display:"inline-block",marginLeft:40,position:"fixed"}}
/> */
}

// {/* </div> */}
// {/* <div style={{display:"inline-block",marginLeft:"50px"}}> */}
//   <Label style={{ display: "inline-block",marginLeft:"20px" }}>To</Label>
// </div>
// </Segment> */}
{
  /* <header style={{ marginBottom: "20px" }}>
<Grid
  container
  direction="row"
  justify="flex-end"
  alignItems="center"
  spacing={3}
>
  <Grid item xs={2}>
    <DatePicker
      selected={this.state.fromDate}
      onChange={this.handleFromDate}
      style={{
        display: "inline-block",
        marginLeft: 40,
        position: "fixed"
      }}
    />
  </Grid>
  <Grid item xs={2}>
    <DatePicker
      selected={this.state.toDate}
      onChange={this.handleToDate}
      style={{ display: "inline-block", padding: "20px" }}
    />
  </Grid>
  <Grid item xs={2}>
    <Button variant="outlined">Download Report</Button>
  </Grid>
  <Grid item xs={6}></Grid>
</Grid>
</header> */
}
