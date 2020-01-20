import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Image, Divider } from "semantic-ui-react";
import { isLoggedIn, isFieldExecutive } from "../util";
import { loginAction } from "../actions/index";
import {
  Grid,
  GridColumn,
  Message,
  GridRow,
  Input,
  Header,
  Form,
  Segment,
  Button,
  Icon
} from "semantic-ui-react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
require("../styles/styles.css");
class Login extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      platform: "web"
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

  authenticate = e => {
    e.preventDefault();
    this.props.login(
      this.state.username,
      this.state.password,
      this.state.platform
    );
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
      <Segment.Group
        raised
        style={{
          marginLeft: "15%",
          marginTop: "5%",
          width: "70%",
          overflow: "hidden",
          height: "550px"
        }}
      >
        <Segment style={{ height: "500px" }}>
          <Grid>
            <Grid.Row>
              <Grid.Column width={8}>
                <h2>logo</h2>
              </Grid.Column>
              <Grid.Column width={8}>
                {this.props.auth.loginError && (
                  <Message warning>
                    <Message.Header>Login Failed!</Message.Header>
                    <p>{this.props.auth.loginMessage}</p>
                  </Message>
                )}
                <p className="sign">Login</p>
                <form>
                <input
                  className="un "
                  type="text"
                  align="center"
                  placeholder="your Email Address"
                  iconPosition="left"
                  onChange={this.handleUsernameChange}
                />
                <br></br>
                <input
                  className="pass"
                  type="password"
                  align="center"
                  placeholder="Password"
                  onChange={this.handlePasswordChange}
                  onKeyDown={this.handleKeyPress}
                />
                <br></br>
                <a class="submit" align="center" onClick={this.authenticate}>
                  Login
                </a>
                <p className="forgot">
                  <a href="#">Forgot Password?</a>
                </p>
                </form>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </Segment.Group>
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
