import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { isLoggedIn, isAdmin } from "./../util";

import { logoutAction } from "../actions/index";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  logout = () => {
    this.props.logout();
  };

  componentWillMount() {
    if (!isLoggedIn(this.props.auth)) {
      this.props.history.push(`/login`);
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (!isLoggedIn(nextProps.auth)) {
      this.props.history.push(`/login`);
      return false;
    }
    return true;
  }
  render() {
    return (
      <div>
        <h1>Home component will display here</h1>
        <button onClick={this.logout}>Logout</button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    home: state.home
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      logout: logoutAction
    },
    dispatch
  );
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
