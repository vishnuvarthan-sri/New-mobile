import React, { Component } from "react";
import DatePicker from "react-datepicker";
import {
  Segment,
  Label,
  Grid,
  Button,
  Header,
  Container,
  Step,
  Icon
} from "semantic-ui-react";
import ReactTable from "react-table-6";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { fetchVerifiedAuditsAction,HdfcAuditReportAction } from "../../actions/report_action";
import "react-datepicker/dist/react-datepicker.css";

export class HdfcReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fromDate: new Date(),
      toDate: new Date()
    };
  }
  componentDidMount() {
    this.props.fetchVerifiedAudits();
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
  downloadReport=() => {
  
    var From = this.state.fromDate;
    var To = this.state.toDate;
    let startDate = From.getDate()+'-'+ (From.getMonth()+1)+'-'+From.getFullYear();
    let endDate = To.getDate()+'-'+ (To.getMonth()+1)+'-'+To.getFullYear();
    this.props.HdfcAuditReportAction(startDate,endDate);

  }
  render() {


    return (
      <div style={{ flexGrow: 1, display: "flex", flexFlow: "column" }}>
        <Container style={{ marginTop: "3%" }}>
          <Step.Group fluid style={{ backgroundColor: "teal" }}>
            <Step>
              <Icon name="arrow alternate circle right" />
              <label for="from">
                <span style={{ fontSize: "15px", fontWeight: "bold" }}>
                  From
                </span>
              </label>
              <hr />
              <DatePicker
                selected={this.state.fromDate}
                onChange={this.handleFromDate}
                placeholderText="Choose From Date"
              />
            </Step>
            <Step>
              <label for="to">
                <span style={{ fontSize: "15px", fontWeight: "bold" }}>To</span>
              </label>
              <hr />
              <DatePicker
                selected={this.state.toDate}
                onChange={this.handleToDate}
                placeholderText="Choose End Date"
              />
              <Icon
                style={{ marginLeft: "15px" }}
                name="arrow alternate circle left"
              />
            </Step>
            <Step>
              <Button primary onClick={this.downloadReport}>Download Report</Button>
            </Step>
          </Step.Group>
        </Container>
      </div>
    );
  }
}


const mapStateToProps = state => {
  return {
    report: state.report
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      fetchVerifiedAudits: fetchVerifiedAuditsAction,
      HdfcAuditReportAction:HdfcAuditReportAction
    },
    dispatch
  );
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HdfcReport)
);
