import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Image, Divider } from "semantic-ui-react";
import { isLoggedIn } from "../util";
import { loginAction } from "../actions/index";
import {
  Grid,
  GridColumn,
  Message,
  GridRow,
  Header,
  Form,
  Segment,
  Button
} from "semantic-ui-react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";

class Login extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: ""
    };
  }
  handleUsernameChange = e => {
    this.setState({ username: e.target.value });
  };

  handlePasswordChange = e => {
    this.setState({ password: e.target.value });
  };

  handleKeyPress = e => {
    if (e.key == "Enter") {
      this.authenticate();
    }
  };

  authenticate = () => {
    this.props.login(this.state.username, this.state.password);
  };

  componentWillMount() {
    if (isLoggedIn(this.props.auth)) {
      this.props.history.push(`/home`);
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (isLoggedIn(nextProps.auth)) {
      this.props.history.push(`/home`);
      return false;
    }
    return true;
  }

  render() {
    return (
      <div>
        <Grid
          textAlign="center"
          style={{ height: "100vh" }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="teal" textAlign="center">
              {/* <Image src="" />  */}
              Log-in to your account
            </Header>
            {this.props.auth.loginError &&
              <Message warning>
                <Message.Header>Login Failed!</Message.Header>
                <p>Your email or password doesn't look right.</p>
              </Message>}
            <Form size="large">
              <Segment stacked>
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="E-mail address"
                  onChange={this.handleUsernameChange}
                />
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                  onChange={this.handlePasswordChange}
                  onKeyDown={this.handleKeyPress}
                />

                <Button
                  color="teal"
                  fluid
                  size="large"
                  onClick={this.authenticate}
                >
                  Login
                </Button>
              </Segment>
            </Form>
            {/* <Message>
              New to us? <a href="#">Sign Up</a>
            </Message> */}
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ login: loginAction }, dispatch);
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
