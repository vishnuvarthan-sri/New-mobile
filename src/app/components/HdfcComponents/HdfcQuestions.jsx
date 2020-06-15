import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import {
  Sidebar,
  Menu,
  Header,
  Image,
  Grid,
  Button,
  Popup,
  Divider,
  Card,
  Form,
  Dropdown,
  Segment,
  Input,
  Icon,
  Label,
  Container,
  Portal,
  Modal
} from "semantic-ui-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  saveHdfcAuditAction,
  getPhotoUrlAction
} from "../../actions/hdfc_action";
import config from "../../config.js";
const storageBaseUrl = config["storage_base_url"];

export class HdfcQuestions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionsView: true,
      audits: this.props.editableAudits,
      editedAudits: this.props.editableAudits,
      editMode: false,
      startDate: new Date(),
      setDate: {},
      saveButton: false,
      open: false
    };
  }
  componentDidMount() {
    this.props.getPhotoUrlAction(this.props.editableAudits._id);
  }

  editAudit = () => {
    this.setState({
      editMode: true,
      saveButton: true
    });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  handleOpen = () => {
    this.props.getPhotoUrlAction(this.props.editableAudits._id);
    this.setState({ open: true });
  };

  editedQuestionsAnswer = (question, answerObject) => {
    let answer = "";
    let audit = this.state.editedAudits;
    if (question.answerType == "text") {
      answer = answerObject.target.value;
      audit.questions.map(q => {
        if (q._id == question._id) {
          q.answer = answer;
        }
      });
    }
    if (question.answerType == "options") {
      answer = answerObject;
      audit.questions.map(q => {
        if (q._id == question._id) {
          q.answer = answer;
        }
      });
    }
    this.setState({ editedAudit: audit });
  };
  handleDateChange = (question, date) => {
    let answer = "";
    let audit = this.state.editedAudits;
    if (question.answerType == "date") {
      console.log(
        date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()
      );
      answer = date;
      audit.questions.map(q => {
        if (q._id == question._id) {
          q.answer = answer;
        }
      });
    }
    this.setState({
      startDate: date,
      editedAudit: audit
    });
  };
  cancelAudit = () => {
    this.setState({
      editMode: false,
      saveButton: false
    });
  };
  saveAudit = () => {
    let audit = this.state.editedAudit;

    this.props.saveHdfcAudit(audit._id, audit);

    this.setState({ editMode: false, saveButton: false });
  };

  render() {
    const { open } = this.state;
    return (
      <div
        style={{
          flexGrow: 1,
          display: "flex",
          flexFlow: "column",
          marginLeft: "4%",
          height: "100%",
        }}
      >
        <div>
          <Button
            content="Photos"
            style={{ marginLeft: "2%", marginTop: 28 }}
            disabled={open}
            color="green"
            onClick={this.handleOpen}
          />
          <Modal onClose={this.handleClose} open={open}>
            <Modal.Header>Photos</Modal.Header>
            <Modal.Content image scrolling>
              {this.props.hdfc.photos != undefined &&
                this.props.hdfc.photos &&
                this.props.hdfc.photos.map(url => {
                  return (
                    <Image.Group size="medium">
                      <Image src={url.uploadedImageUrl} />
                      {/* <Image src={url.uploadedImageUrl[1]} /> */}
                    </Image.Group>
                  );
                })}
            </Modal.Content>
            <Modal.Actions>
              <Button color="red" onClick={this.handleClose}>
                <Icon name="remove" /> close
              </Button>
            </Modal.Actions>
          </Modal>
          <Segment
            onClick={this.props.onClose}
            style={{
              backgroundColor: "#ebebfc",
              float: "right",
              cursor: "pointer",
              marginTop: 20,

              right: 58
            }}
          >
            <Icon name="arrow" className="left large" color="brown" />
          </Segment>
        </div>
        <Header color="orange" as="h4" style={{marginLeft:"2%"}}>
          Audits done by : Maris, Date: 17-12-1996, Location: Chennai
        </Header>
        <Segment
          raised
          style={{
            marginTop: "1%",
            marginLeft: "2.5%",
            width: "1400px",
            height: "2200px",
            overflow:"scroll"
          }}
        >
          <Divider horizontal>Master Data</Divider>
          <Grid columns={3} doubling stackable style={{ paddingLeft: "12%" }}>
            <Grid.Column>
              <label for="name" style={{ display: "inline-block" }}>
                Name :
              </label>
              <span
                style={{
                  display: "inline-block",
                  fontWeight: "bold",
                  marginLeft: "10px"
                }}
              >
                {this.state.audits.customerName}
              </span>
            </Grid.Column>
            <Grid.Column>
              <label for="fileno" style={{ display: "inline-block" }}>
                File No :
              </label>
              <span
                style={{
                  display: "inline-block",
                  fontWeight: "bold",
                  marginLeft: "10px"
                }}
              >
                {this.state.audits.fileNo}
              </span>
            </Grid.Column>
            <Grid.Column>
              <label for="extno" style={{ display: "inline-block" }}>
                Ext No :
              </label>
              <span
                style={{
                  display: "inline-block",
                  fontWeight: "bold",
                  marginLeft: "10px"
                }}
              >
                {this.state.audits.extNo}
              </span>
            </Grid.Column>
            <Grid.Column>
              <label for="faxno" style={{ display: "inline-block" }}>
                Fax No :
              </label>
              <span
                style={{
                  display: "inline-block",
                  fontWeight: "bold",
                  marginLeft: "10px"
                }}
              >
                {this.state.audits.faxNo}
              </span>
            </Grid.Column>
            <Grid.Column>
              <label for="date" style={{ display: "inline-block" }}>
                Date Reffered :
              </label>
              <span
                style={{
                  display: "inline-block",
                  fontWeight: "bold",
                  marginLeft: "10px"
                }}
              >
                {this.state.audits.dateReferred}
              </span>
            </Grid.Column>
            <Grid.Column>
              <label for="capacity" style={{ display: "inline-block" }}>
                Capacity :
              </label>
              <span
                style={{
                  display: "inline-block",
                  fontWeight: "bold",
                  marginLeft: "10px"
                }}
              >
                {this.state.audits.capacity}
              </span>
            </Grid.Column>
            <Grid.Column>
              <label for="app" style={{ display: "inline-block" }}>
                Appraiser :
              </label>
              <span
                style={{
                  display: "inline-block",
                  fontWeight: "bold",
                  marginLeft: "10px"
                }}
              >
                {this.state.audits.appraiser}
              </span>
            </Grid.Column>
            <Grid.Column>
              <label for="landmark" style={{ display: "inline-block" }}>
                Landmark :
              </label>
              <span
                style={{
                  display: "inline-block",
                  fontWeight: "bold",
                  marginLeft: "10px"
                }}
              >
                {this.state.audits.landmark}
              </span>
            </Grid.Column>
            <Grid.Column>
              <label for="auditType" style={{ display: "inline-block" }}>
                Audit type :
              </label>
              <span
                style={{
                  display: "inline-block",
                  fontWeight: "bold",
                  marginLeft: "10px"
                }}
              >
                {this.state.audits.auditType}
              </span>
            </Grid.Column>
            <Grid.Column>
              <label for="company" style={{ display: "inline-block" }}>
                Company :
              </label>
              <span
                style={{
                  display: "inline-block",
                  fontWeight: "bold",
                  marginLeft: "10px"
                }}
              >
                {this.state.audits.nameOfCompany}
              </span>
            </Grid.Column>
            <Grid.Column>
              <label for="origin" style={{ display: "inline-block" }}>
                Place :
              </label>
              <span
                style={{
                  display: "inline-block",
                  fontWeight: "bold",
                  marginLeft: "10px"
                }}
              >
                {this.state.audits.placeOfOrigin}
              </span>
            </Grid.Column>
            <Grid.Column>
              <label for="status" style={{ display: "inline-block" }}>
                Status :
              </label>
              <span
                style={{
                  display: "inline-block",
                  fontWeight: "bold",
                  marginLeft: "10px"
                }}
              >
                {this.state.audits.status}
              </span>
            </Grid.Column>
            <Grid.Column>
              <label for="phone" style={{ display: "inline-block" }}>
                Mobile No :
              </label>
              <span
                style={{
                  display: "inline-block",
                  fontWeight: "bold",
                  marginLeft: "10px"
                }}
              >
                {this.state.audits.telephoneNumber}
              </span>
            </Grid.Column>
            <Grid.Column>
              <label for="web" style={{ display: "inline-block" }}>
                WebSite :
              </label>
              <span
                style={{
                  display: "inline-block",
                  fontWeight: "bold",
                  marginLeft: "10px"
                }}
              >
                {this.state.audits.websiteAddress}
              </span>
            </Grid.Column>
          </Grid>

          <AuditedQuestions
            auditQuestions={this.state.audits}
            state={this.state}
            changeAnswer={this.editedQuestionsAnswer}
            handleChange={this.handleDateChange}
            EditAudit={this.editAudit}
            SaveAudit={this.saveAudit}
            CancelAudit={this.cancelAudit}
          />
        </Segment>
      </div>
    );
  }
}

const AuditedQuestions = function(props) {
  var Questions = [];
  props.auditQuestions.questions.map(ques => {
    Questions.push(
      <Grid.Column style={{ paddingTop: "4%" }}>
        {ques.answerType == "text" && (
          <Grid>
            <Grid.Row>
              <Grid.Column width={6} style={{ display: "inline-block" }}>
                <span style={{ fontWeight: "bold", fontSize: "16px" }}>
                  {ques.question}
                </span>
              </Grid.Column>
              <Grid.Column width={5} style={{ display: "inline-block" }}>
                <Input
                  style={{ display: "inline-block" }}
                  disabled={!props.state.editMode}
                  value={ques.answer}
                  onChange={e => props.changeAnswer(ques, e)}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        )}
        {ques.answerType == "options" && (
          <Grid>
            <Grid.Row>
              <Grid.Column width={6} style={{ display: "inline-block" }}>
                <span style={{ fontWeight: "bold", fontSize: "16px" }}>
                  {ques.question}
                </span>
                
              </Grid.Column>
              <Grid.Column width={5} style={{ display: "inline-block" }}>
                <Dropdown
                  style={{ display: "inline-block", width: "10%" }}
                  options={ques.options.map((label, i) => {
                    return {
                      value: label.value,
                      text: label.label,
                      key: label.value
                    };
                  })}
                  disabled={!props.state.editMode}
                  onChange={(e, { value }) => props.changeAnswer(ques, value)}
                  value={ques.answer}
                  selection
                  placeholder={"Select any option"}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        )}
        {ques.answerType == "date" && (
          <Grid>
            <Grid.Row>
              <Grid.Column width={6} style={{ display: "inline-block" }}>
                <span style={{ fontWeight: "bold" }}>{ques.question}</span>
              </Grid.Column>
              <Grid.Column width={5} style={{ display: "inline-block" }}>
                <DatePicker
                  disabled={!props.state.editMode}
                  selected={
                    ques.answer
                      ? new Date(ques.answer)
                      : props.state.setDate[ques._id]
                  }
                  onChange={date => props.handleChange(ques, date)}
                  className="form-control"
                  monthsShown={1}
                  dateFormat={"dd/MM/yyyy"}
                  popperPlacement="bottom"
                  style={{
                    display: "inline-block"
                  }}
                  popperModifiers={{
                    flip: {
                      behavior: ["bottom"]
                    },
                    preventOverflow: {
                      enabled: false
                    },
                    hide: {
                      enabled: false
                    }
                  }}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        )}
      </Grid.Column>
    );
  });
  return (
    <Grid>
      <Divider horizontal><Label color="green" size="medium">Audited Questions</Label></Divider>
      <div style={{ marginLeft: "85%" }}>
        {!props.state.saveButton && (
          <Button
            style={{ borderRadius: "14px" }}
            color="black"
            onClick={props.EditAudit}
          >
            Edit
          </Button>
        )}

        {props.state.saveButton && (
          <div>
            <Button
              style={{ borderRadius: "14px" }}
              primary
              onClick={props.SaveAudit}
            >
              Save
            </Button>
            <Button
              style={{ borderRadius: "14px" }}
              danger
              onClick={props.CancelAudit}
            >
              Cancel
            </Button>
          </div>
        )}
      </div>
      <Grid.Row
        columns={2}
        style={{
          marginTop: "1%",
          height: 450,
          width: "80%",
          marginLeft: "8%"
        }}
      >
        {Questions}
      </Grid.Row>
    </Grid>
  );
};

const mapStateToProps = state => {
  return {
    hdfc: state.hdfc
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      saveHdfcAudit: saveHdfcAuditAction,
      getPhotoUrlAction: getPhotoUrlAction
    },
    dispatch
  );
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HdfcQuestions)
);
