import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { isLoggedIn, isAdmin, isVendor } from "./../util";
import { selectMenuAction, logoutAction } from "../actions/index";
import { fetchHdfcMasterAction } from "../actions/hdfc_action";
import {
  Container,
  Segment,
  Input,
  Icon,
  Label,
  Loader,
} from "semantic-ui-react";

import {
  Sidebar,
  Menu,
  Header,
  Image,
  Button,
  Dropdown,
} from "semantic-ui-react";
import HdfcAudits from "./HdfcComponents/HdfcAudits.jsx";
import "@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css";
export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sideBarVisible: true,
      auditedAudits: [],
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
  }

  componentDidMount() {
    // this.props.fetchHdfcMasterAction();
  }
  componentWillReceiveProps(nextprops) {
    // let columns = this.state.columns;
    // let columnsNeeded = this.state.columnsNeeded;
    // let userNameColumns = this.state.userNameColumns;
    // let userNameColumnsNeeded = this.state.userNameColumnsNeeded;
    // let userName = this.state.userName;
    // if (this.props.hdfc.auditedAudits !== nextprops.hdfc.auditedAudits) {
    //   console.log(nextprops.hdfc.auditedAudits,"home")
    //   this.setState({
    //     auditedAudits: [...nextprops.hdfc.auditedAudits],
    //   });
      // let value = Object.keys(nextprops.hdfc.auditedAudits[0]);

      // if (value.length) {
      //   value.forEach((data) => {
      //     columnsNeeded.forEach((el) => {
      //       if (data === el) {
      //         columns.push({
      //           name: data,
      //           title: data,
      //         });
      //       }
      //     });
      //   });
      // }

      // this.setState({
      //   columns,
      //   audit: [...nextprops.hdfc.auditedAudits],
      // });
    // }
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (!isLoggedIn(nextProps.auth)) {
      this.props.history.push(`/login`);
      return false;
    }
    return true;
  }

  toggleSidebar = () => {
    this.setState({ sideBarVisible: !this.state.sideBarVisible });
  };

  openControlPanel = () => {
    this.props.history.push(`/controlpanel`);
  };
  render() {
    var activeItem = "hdfc";

    var pusherStyle = {
      height: "100%",
      overflow: "auto",
      overflowX: "hidden",
      width: "85%",
    };

    if (!this.state.sideBarVisible) {
      pusherStyle.width = "100%";
    }
    return (
      <div style={{ height: "100%" }}>
        <Segment
          raised
          style={{
            backgroundColor: "#fofcf7",
            height: 60,
            position: "-webkit-sticky",
            position: "relative",
          }}
        >
          <div style={{ display: "inline-block" }}>
            <Icon
              style={{
                display: "inline-block",
                cursor: "pointer",
                float: "left",
                color: "black",
                marginTop: 4,
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
              paddingRight: 50,
            }}
          >
            <Menu.Menu
              style={{ display: "inline", float: "right", marginTop: 8 }}
            >
              <Dropdown pointing text={this.props.auth.displayName}>
                <Dropdown.Menu>
                  {isAdmin(this.props.auth) && (
                    <Dropdown.Item onClick={this.openControlPanel}>
                      Control Panel
                    </Dropdown.Item>
                  )}
                  {isVendor(this.props.auth) && (
                    <Dropdown.Item onClick={this.openControlPanel}>
                      Control Panel
                    </Dropdown.Item>
                  )}
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
            height: "calc(100% - 70px)",
          }}
        >
          <Sidebar
            as={Menu}
            visible={this.state.sideBarVisible}
            activeIndex="0"
            style={{
              flex: "0 0 150px",
              backgroundColor: "#2c3e50",
              paddingTop: 30,
              position: "fixed",
              overflow: "scroll",
            }}
            animation="slide along"
            width="thin"
            icon="labeled"
            vertical
            inverted
          >
            <Menu.Item
              name="hdfc"
              active={activeItem === "hdfc"}
              color="teal"
              onClick={this.handleItemClick}
            >
              <Icon name="rupee" />
              <span style={{ color: "black" }}>HDFC</span>
            </Menu.Item>
          </Sidebar>
          <Sidebar.Pusher style={pusherStyle}>
            <Segment
              basic
              style={{
                height: "100%",
                display: "flex",
                padding: "10px 0px 0px 0px",
              }}
            >
              {activeItem === "hdfc" &&
               
                <HdfcAudits auditedAudits={this.state.auditedAudits} />
             
              }
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    home: state.home,
    hdfc: state.hdfc,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      logout: logoutAction,
      selectMenu: selectMenuAction,
      fetchHdfcMasterAction: fetchHdfcMasterAction,
    },
    dispatch
  );
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
