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
  Icon,
} from "semantic-ui-react";
import ReactTable from "react-table-6";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import {
  fetchVerifiedAuditsAction,
  HdfcAuditReportAction,
  mailAuditReportAction,

} from "../../actions/report_action";
import "react-datepicker/dist/react-datepicker.css";
import MailPopup from './MailPopup.jsx';

export class HdfcReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fromDate: new Date(),
      toDate: new Date(),
      firstDateChoose: null,
      isMailPopupView: false,
      mailIds: ""
    };
  }
  componentDidMount() {
    this.props.fetchVerifiedAudits();
  }
  handleFromDate = date => {
    this.setState({
      fromDate: date,
      firstDateChoose: date
    });
  };
  handleToDate = date => {
    this.setState({
      toDate: date
    });
  };
  handleMailReportClick = e => {
    this.setState({ isMailPopupView: !this.state.isMailPopupView });
  };
  handleSendMailReportClick = m => {
    console.log(m);
    this.setState({ isMailPopupView: !this.state.isMailPopupView, mailIds: m });
    var From = this.state.fromDate;
    var To = this.state.toDate;
    var mailId = this.state.mailIds;
    if (From < To === true) {
      let startDate =
        From.getDate() + "-" + (From.getMonth() + 1) + "-" + From.getFullYear();
      let endDate =
        To.getDate() + "-" + (To.getMonth() + 1) + "-" + To.getFullYear();
      this.props.mailAuditReportAction(startDate, endDate,mailId);
    } else {
      alert("choose a date greater than from date");
    }
  };
  downloadReport = () => {
    var From = this.state.fromDate;
    var To = this.state.toDate;
    if (From < To === true) {
      let startDate =
        From.getDate() + "-" + (From.getMonth() + 1) + "-" + From.getFullYear();
      let endDate =
        To.getDate() + "-" + (To.getMonth() + 1) + "-" + To.getFullYear();
      this.props.HdfcAuditReportAction(startDate, endDate);
    } else {
      alert("choose a date greater than from date");
    }
  };
  render() {
    return (
      <div style={{ flexGrow: 1, display: "flex", flexFlow: "column" }}>
        <Container style={{ marginTop: "3%" }}>
          <Step.Group fluid style={{ backgroundColor: "teal" }}>
            <Step>
              <Label color="teal" style={{ borderRadius: 18 }}>
                <span style={{ fontSize: "15px", fontWeight: "bold" }}>
                  From
                </span>
              </Label>
              <hr />
              <DatePicker
                selected={this.state.fromDate}
                onChange={this.handleFromDate}
                placeholderText="Choose From Date"
              />
            </Step>
            <Step>
              <Label color="teal" style={{ borderRadius: 18 }}>
                <span style={{ fontSize: "15px", fontWeight: "bold" }}>To</span>
              </Label>
              <hr />
              {this.state.firstDateChoose != null && (
                <DatePicker
                  selected={this.state.toDate}
                  onChange={this.handleToDate}
                  placeholderText="Choose End Date"
                />
              )}
            </Step>
            <Step>
              <Button
                primary
                style={{ borderRadius: 18 }}
                onClick={this.downloadReport}
              >
                Download Report
              </Button>
            </Step>
            <Step>
              <Button
                color="orange"
                onClick={this.handleMailReportClick}
                style={{ borderRadius: 18 }}
              >
                Mail Report
              </Button>
            </Step>
          </Step.Group>
        </Container>
        {this.state.isMailPopupView ? (
          <MailPopup
            open={this.state.isMailPopupView}
            mailIds={this.state.mailIds}
            closePopup={this.handleMailReportClick.bind(this)}
            sendMailAndClosePopup={this.handleSendMailReportClick}
          />
        ) : null}
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
      HdfcAuditReportAction: HdfcAuditReportAction,
      mailAuditReportAction:  mailAuditReportAction

    },
    dispatch
  );
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HdfcReport)
);
