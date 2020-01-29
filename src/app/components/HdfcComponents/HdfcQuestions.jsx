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
  Label
} from "semantic-ui-react";

export class HdfcQuestions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionsView: true,
      audits: this.props.editableAudits
    };
  }

  render() {
    console.log(this.state.audits);
    return (
      <div
        style={{
          flexGrow: 1,
          display: "flex",
          flexFlow: "column",
          backgroundColor: "#ece9e6",
          marginLeft: "4%"
        }}
      >
        <div>
          <Button.Group style={{ float: "right" }}>
            <Button onClick={this.props.onClose}>Previous</Button>
            <Button.Or />
            <Popup
              content="This.is last page"
              position="top right"
              inverted
              trigger={<Button positive>Next</Button>}
            />
          </Button.Group>
        </div>
        <Segment
          raised
          style={{ marginTop: "3%", marginLeft: "2.5%", width: "1400px" }}
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
        </Segment>
        <Divider horizontal>Audited Questions</Divider>
        <div>
         
            
              
                {this.state.audits.questions &&
                  this.state.audits.questions.map(ques => {
                    return (
                      <Form.Field>
                      <Grid columns={2}>
                      <Grid.Row>
                      <Grid.Column
                        width={8}
                        style={{ display: "inline-block" }}
                      >
                        {ques.question}
                      </Grid.Column>
                       {ques.answerType == "text" &&
                       <Grid.Column
                         width={8}
                         style={{ display: "inline-block" }}
                       >
                         <Input
                           style={{ display: "inline-block" }}
                           value={ques.answer}
                         />
                       </Grid.Column>}
                       {ques.answerType == "options" &&
                       <Grid.Column
                         width={8}
                         style={{ display: "inline-block" }}
                       >
                         <Dropdown
                           style={{ display: "inline-block" }}
                           value={ques.answer}
                           selection
                         />
                       </Grid.Column>}
                       </Grid.Row>
                       </Grid>
                       </Form.Field>
                    );
                  })}
          
            
          
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    hdfc: state.hdfc
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({}, dispatch);
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HdfcQuestions)
);
