import React, { Component } from "react";
import DatePicker from "react-datepicker";
import {
  Segment,
  Label,
  Grid,
  Button,
  Dropdown,
  Header,
  Container,
  Step,
  Icon,
} from "semantic-ui-react";
import ReactTable from "react-table";
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
      status:"",
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
  onStatusChange = data => {
    this.setState({ status: data });
  };

  handleMailReportClick = () => {
    this.setState({ isMailPopupView: !this.state.isMailPopupView });
  };
  handleSendMailReportClick = mailIds => {
    this.setState({ isMailPopupView: !this.state.isMailPopupView, mailId: mailIds });
    var From = this.state.fromDate;
    var To = this.state.toDate;
    var status = this.state.status;
    var mailId = mailIds;
 
    if (From < To === true) {
      let startDate =
        From.getDate() + "-" + (From.getMonth() + 1) + "-" + From.getFullYear();
      let endDate =
        To.getDate() + "-" + (To.getMonth() + 1) + "-" + To.getFullYear();
      this.props.mailAuditReportAction(startDate,endDate,status,mailId);
    } else {
      alert("choose a date greater than from date");
    }
  };
  downloadReport = () => {
    var From = this.state.fromDate;
    var To = this.state.toDate;
    var status = this.state.status;
    if (From < To === true) {
      let startDate =
        From.getDate() + "-" + (From.getMonth() + 1) + "-" + From.getFullYear();
      let endDate =
        To.getDate() + "-" + (To.getMonth() + 1) + "-" + To.getFullYear();
      this.props.HdfcAuditReportAction(startDate,endDate,status);
    } else {
      alert("choose a date greater than from date");
    }
  };
  render() {
    const statusOptions = [
      { key: 1, value: "all", text: "all" },
      {
        key: 2,
        value: "initial",
        text: "initial"
      },
      { key: 3, value: "audited", text: "audited" },
      { key : 4, value: "verified" , text:"verified"},
      {key:5,value:"complete",text:"complete"}
    ];
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
            <label for="role">Status</label>
                        <br />
                        <Dropdown
                          style={{ borderRadius: 18}}
                          selection
                          placeholder="Your Role"
                          options={statusOptions}
                          value={this.state.status}
                          onChange={(e, data) => {
                            this.onStatusChange(data.value);
                          }}
                        />
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
