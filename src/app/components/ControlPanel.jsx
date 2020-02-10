
import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { isLoggedIn, isAdmin, isQualityControl } from "./../util";
import { selectMenuAction, logoutAction } from "../actions/index";
import { Container, Segment, Input, Icon, Label } from "semantic-ui-react";
import {
  Sidebar,
  Menu,
  Header,
  Image,
  Button,
  Dropdown
} from "semantic-ui-react";
import User from "../components/ControlPanelComponents/User.jsx";
import HdfcReport from "../components/ControlPanelComponents/HdfcReport.jsx";

class ControlPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sideBarVisible: true
    };
  }

  handleItemClick = (e, { name }) => this.props.selectMenu(name);

  logout = () => {
    this.props.logout();
  };

  componentWillMount() {
    if (!isLoggedIn(this.props.auth)) {
      this.props.history.push(`/login`);
    }

    if (!isAdmin(this.props.auth)) {
      this.props.history.push(`/`);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (!isLoggedIn(nextProps.auth)) {
      this.props.history.push(`/login`);
      return false;
    }
    if (!isAdmin(this.props.auth)) {
      this.props.history.push(`/`);
      return false;
    }
    return true;
  }

  toggleSidebar = () => {
    this.setState({ sideBarVisible: !this.state.sideBarVisible });
  };

  openHome = () => {
    this.props.history.push(`/home`);
  };
  render() {
    var activeItem = this.props.home.selectedMenu || "user";
    console.log(activeItem)
    var pusherStyle = { height: "100%", overflow: "auto", width: "87.5%" };

    if (!this.state.sideBarVisible) {
      pusherStyle.width = "100%";
    }
    return (
      <div style={{ height: "100%" }}>
        <Segment raised style={{ backgroundColor: "fofcf7", height: 60 }}>
          <div style={{ display: "inline-block" }}>
            <Icon
              style={{
                display: "inline-block",
                cursor: "pointer",
                float: "left",
                color: "c1c7c4",
                marginTop: 4
              }}
              onClick={this.toggleSidebar}
              size="big"
              name="bars"
            />
          </div>
          <div
            style={{
              display: "inline-block",
              float: "right",
              paddingRight: 50
            }}
          >
            <Menu.Menu
              style={{ display: "inline", float: "right", marginTop: 8 }}
            >
              <Dropdown pointing text={this.props.auth.displayName}>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={this.openHome}>Home</Dropdown.Item>
                  <Dropdown.Item onClick={this.logout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Menu.Menu>
          </div>
        </Segment>
        <Sidebar.Pushable
          as={Segment}
          style={{
            marginTop: -15,
            display: "flex",
            borderRadius: 0,
            height: "calc(100% - 70px)"
          }}
        >
          <Sidebar
            as={Menu}
            visible={this.state.sideBarVisible}
            activeIndex="0"
            style={{
              flex: "0 0 150px",
              backgroundColor: "#ebebfc",
              paddingTop: 30
            }}
            animation="slide along"
            width="thin"
            icon="labeled"
            vertical
            inverted
          >
            <Menu.Item
              name="user"
              active={activeItem === "user"}
              color="teal"
              onClick={this.handleItemClick}
              style={{ marginTop: 10 }}
            >
              <Icon name="users" color="black" />
             <span style={{color:"black"}}>Users</span>
            </Menu.Item>
            <Menu.Item
              name="report"
              active={activeItem === "report"}
              color="teal"
              onClick={this.handleItemClick}
              style={{ marginTop: 10 }}
            >
              <Icon name="file excel" color="black" />
              <span style={{color:"black"}}>Report</span>
            </Menu.Item>
          </Sidebar>
          <Sidebar.Pusher style={pusherStyle}>
            <Segment
              basic
              style={{
                height: "100%",
                display: "flex",
                padding: "10px 0px 0px 0px"
              }}
            >
              {activeItem === "user" && <User />}
              {activeItem === "report" && <HdfcReport/>}
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
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
      logout: logoutAction,
      selectMenu: selectMenuAction
    },
    dispatch
  );
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ControlPanel)
);
