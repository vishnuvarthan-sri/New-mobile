import React, { Component } from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment
} from "semantic-ui-react";
import { saveResetPasswordAction } from "../actions/user_action";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router";


class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);
    let filter = new URLSearchParams(props.location.search);
    this.state = {
      newPassword: "",
      confirmPassword: "",
      passwordDoesNotMatch: false,
      email: filter.get("email"),
      code: filter.get("code")
    };
  }

  newPassword = e => {
    this.setState({
      newPassword: e.target.value
    });
  };
  confirmPassword = e => {
    this.setState({
      confirmPassword: e.target.value
    });
  };
  PasswordSubmit = () => {
    let email = this.state.email;
    let code = this.state.code;
    if (this.state.newPassword === this.state.confirmPassword) {
      this.setState({ passwordDoesNotMatch: false });
      this.props.saveResetPassword(email, this.state.confirmPassword, code);
    } else {
      this.setState({ passwordDoesNotMatch: true, confirmPassword: "" });
      // return(

      // )
    }
  };
  render() {
    return (
      <div style={{ backgroundColor: "#E9E4F0" }}>
        <Grid
          textAlign="center"
          style={{ height: "100vh" }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 500 }}>
            <Header as="h2" color="teal" textAlign="center">
              Reset Password
            </Header>

			{this.state.passwordDoesNotMatch && 
                  <Message warning>
                    <p>Passwords do not match</p>
                  </Message>
                }
            <Form size="large">
              <Segment stacked>
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="New Password"
                  value={this.state.newPassword}
                  onChange={this.newPassword}
                />
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Confirm Password"
                  value={this.state.confirmPassword}
                  onChange={this.confirmPassword}
                />

                <Button
                  primary
                  fluid
                  size="large"
                  onClick={this.PasswordSubmit}
                >
                  Submit
                </Button>
                
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      saveResetPassword: saveResetPasswordAction
    },
    dispatch
  );
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ForgotPassword)
);
