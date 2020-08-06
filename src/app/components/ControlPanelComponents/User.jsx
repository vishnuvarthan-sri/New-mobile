import React, { Component } from "react";

import {
  Container,
  Segment,
  Input,
  Icon,
  Label,
  Form,
  Grid,
  Modal
} from "semantic-ui-react";
import {
  Sidebar,
  Menu,
  Header,
  Image,
  Button,
  Dropdown
} from "semantic-ui-react";
import Table from '../Table.jsx'
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import {
  fetchUserAction,
  saveUserDetailAction,
  AddUsersDetailAction,
  setCurrentUser,
  fetchAssignedLineItemAction,
  forgotPasswordAction,
  generatePinAction,
  reassignAuditAction,
} from "../../actions/user_action";
import { isLoggedIn, isAdmin } from "./../../util";
import { SemanticToastContainer, toast } from 'react-semantic-toasts';
import 'react-semantic-toasts/styles/react-semantic-alert.css';
const ModalTableStyle = {
  width:"100%",
  marginLeft:"-10px",
  textAlign:"center",
  padding:"0"
  // height:"250px"
  
}
const controlPanelTableStyle = {
  width:"90%",
  borderSpacing: 0,
  border: '1px solid #dde0e5',
  /* background-color:#F5FFFA; */
  marginLeft: '80px',
  marginTop: "2%",
  outline: "thick"
}

export class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      id:"",
      name: "",
      phone: "",
      email: "",
      role: "",
      imei: "",
      pin: "",
      pinCode:"",
      saveError: false,
      newUser: false,
      auditId: null,
      totalUsers: [],
      assignedItemsForUser:[],
      showTable: false
    };
  }
  componentDidMount() {
    this.props.fetchUser();
  }
  componentWillReceiveProps(nextprops){
  
    var reassign = "";
    if(nextprops.user.allUsers !== this.props.user.allUsers){
      
      this.setState({
        totalUsers: [...nextprops.user.allUsers]
      })
    }
    if(nextprops.user.assignedLineItem != this.props.user.assignedLineItem){
     
      nextprops.user.assignedLineItem.map((id)=>{
         reassign  = id._id;
      })
      this.setState({
        auditId: reassign,
        assignedItemsForUser:[...nextprops.user.assignedLineItem]
      })
    }
    
  }
  addNewUser = () => {
    var newUser = {};
    newUser.displayName = "";
    newUser.mobileNo = "";
    newUser.email = "";
    newUser.role = "";
    newUser.imei = ""
    this.props.setCurrentUser(newUser);
    this.setState({
      editMode: true,
      newUser: true,
      name: "",
      phone: "",
      email: "",
      imei: "",
      pinCode:""
    });
  }
  editUserDetail = data => {
  
    if(data !== undefined){
      
      const userId = data.original._id;
      this.props.fetchUser();
      this.props.fetchAssignedLineItem(userId);
      this.props.setCurrentUser(data.original);
      this.setState({
        editMode: true,
        id: data.original._id
  ,     name: data.original.displayName,
        phone: data.original.mobileNo,
        email: data.original.email,
        role: data.original.role,
        imei: data.original.imei,
        newUser: false
      });
    }

   
  };
  saveEditedUser = () => {
    var user = this.props.user.currentUser;
    user.displayName = this.state.name;
    user.mobileNo = this.state.phone;
    user.email = this.state.email;
    user.role = this.state.role;
    this.props.setCurrentUser(user);
    this.props.saveUserDetail(user);
    this.setState({ newUser: {}, editMode: false, saveError: false });
  };
  saveNewUser = () => {
    var user = this.props.user.currentUser;
    user.displayName = this.state.name;
    user.mobileNo = this.state.phone;
    user.email = this.state.email;
    user.role =  this.state.role;
    user.pinCode = this.state.pinCode;
    this.props.setCurrentUser(user);
    this.props.AddUsersDetailAction(user);
    this.setState({ newUser: {}, editMode: false, saveError: false, newUser: false  });
  };
  reassignAudits = (data) => {
    let userId = ""
    if(this.props.user.allUsers && this.props.user.allUsers.map((id)=>{
      userId = id._id;
    }))
    
    this.props.reassignAudit(this.state.auditId,data);
  }
  onNameChange = e => {
    this.setState({ name: e.target.value });
  };
  onEmailChange = e => {
    this.setState({ email: e.target.value });
  };
  onPhoneChange = e => {
    this.setState({ phone: e.target.value });
  };
  onPinCodeChange = e =>{
    this.setState({pinCode:e.target.value});
  }
  onRoleChange = data => {
    this.setState({ role: data });
  };
  closeEditUser = () => {
    this.setState({ editMode: false });
  };
  forgotPasswordaction = () => {
    var userId = this.props.user.currentUser;
    this.props.forgotPassword(userId._id)
  } 
  generatePinaction = () => {
    var userId = this.props.user.currentUser;
    this.props.generatePin(userId._id)
  } 

  render() {
   
    let userData = this.state.totalUsers.length !== 0 ? this.state.totalUsers : []
    let assignedItemsForUser = this.state.assignedItemsForUser

    let userOptions = [];
    {this.props.user.allUsers && this.props.user.allUsers.map((name)=>{
      return(
        userOptions.push({
          key:name._id, text: name.displayName, value: name._id
        })
      )
    })}
    const roleOptions = [
      { key: 1, value: "admin", text: "admin" },
      {
        key: 2,
        value: "qualityControlAgents",
        text: "qualityControlAgents"
      },
      { key: 3, value: "fieldExecutives", text: "fieldExecutives" }
    ];
    const columns = [
      {
        Header: "Name",
        accessor: "displayName",
        // style: { textAlign: "center", cursor: "pointer" },
        // Cell: row => (
        //   <AuditTableCell row={row.original} text={row.original.displayName} />
        // )
      },
      {
        Header: "Email",
        accessor: "email",
        // style: { textAlign: "center", cursor: "pointer" },
        // Cell: row => (
        //   <AuditTableCell row={row.original} text={row.original.email} />
        // )
      },
      {
        Header: "PhoneNumber",
        accessor: "mobileNo",
        style: { textAlign: "center", cursor: "pointer" },
        // Cell: row => (
        //   <AuditTableCell row={row.original} text={row.original.mobileNo} />
        // )
      },
      {
        Header: "Role",
        accessor: "role",
        style: { textAlign: "center", cursor: "pointer" },
        // Cell: row => (
        //   <AuditTableCell row={row.original} text={row.original.role} />
        // )
      },
      {
        Header: "Action",
        accessor: "editing",
        Cell: row => (
          <div>
            {!this.state.editMode && (
              <Button
                onClick={() => this.editUserDetail(row.original)}
                animated
                style={{
                  width: "7vw",
                  backgroundColor: "green",
                  color: "white",
                  fontFamily: "Arial, Helvetica, sans-serif",
                  marginLeft: "30%"
                }}
                // onClick={this.editPromotionClick.bind(this, row.original)}
              >
                <Button.Content visible>Edit</Button.Content>
                <Button.Content hidden>
                  <Icon name="undo alternate" />
                </Button.Content>
              </Button>
            )}
          </div>
        )
      }
    ];
    const column = [
      {
        Header: "Name",
        accessor: "customerName",
        // style: { textAlign: "center", cursor: "pointer" },
        // Cell: row => (
        //   <AuditTableCell row={row.original} text={row.original.customerName} />
        // )

      },
      {
        Header: "Email",
        accessor: "emailId",
        // style: { textAlign: "center", cursor: "pointer" },
        // Cell: row => (
        //   <AuditTableCell row={row.original} text={row.original.emailId} />
        // )

      },
      {
        Header: "PhoneNumber",
        accessor: "telephoneNumber",
        // style: { textAlign: "center", cursor: "pointer" }

      },

      {
        Header: "File No",
        accessor: "fileNo",
        // style: { textAlign: "center", cursor: "pointer" }

      },
      {
        Header: "Ext NO",
        accessor: "extNo",
        // style: { textAlign: "center", cursor: "pointer" }

      },
      {
        Header: "Fax NO",
        accessor: "faxNo",
        // style: { textAlign: "center", cursor: "pointer" }

      },
      {
        Header: "Reassign",
        accessor: "role",
        Cell: row => (
          <Dropdown
            // className="react-table-dropdown"
            placeholder=""
            fluid
            search
            selection
            onChange={(e,data) => {this.reassignAudits(data.value)}}
            // onChange={(e, data) => {
            //   this.handleDealerAssessmentOptionsSelect(
            //     question._id,
            //     data.value
            //   );
            // }}
            options={userOptions}
            style={{zIndex:"1000 !important",width:"150px",marginTop:"-5px",marginLeft:"70px"}}
          />
        )
      }
    ];
    return (
      <div style={{ flexGrow: 1, display: "flex", flexFlow: "column" }}>
        <div>
          <h1 style={{ paddingLeft: 30, flex: "0 0 30px",display:"inline-block" }}>User Details</h1>
          <Label style={{marginLeft:"76%", cursor:"pointer"}} size="large" color="orange" onClick={this.addNewUser}>
          <Icon name="user plus"/>
            AddUsers</Label>
         
          {/* <div style={{ display: "flex", flexGrow: 1, flexFlow: "column" }}> */}
            <div>
              {/* <ReactTable
                noDataText="We couldn't find anything"
                filterable={true}
                defaultPageSize={20}
                sortable={true}
                style={{ height: "85%", width: "95%", marginLeft: 30 }}
                columns={columns}
                data={userList}
              /> */}
              <Table columns={columns} data = {userData} rowInfo={this.editUserDetail} styles={controlPanelTableStyle}/>
            </div>
            <Modal
              open={this.state.editMode}
              onClose={this.closeEditUser}
              size={this.state.newUser === false ? "fullscreen": this.state.newUser === true ? "large":"large"}
            >
              <Modal.Content>
                <Form>
                  <Grid columns={2}>
                    <Grid.Row>
                      <Grid.Column>
                        <Form.Input
                          label="Name"
                          type="text"
                          placeholder="Your name"
                          value={this.state.name}
                          onChange={this.onNameChange}
                        />
                      </Grid.Column>
                      <Grid.Column>
                        <Form.Input
                          label="PhoneNumber"
                          type="any"
                          placeholder="Your phone number"
                          value={this.state.phone}
                          onChange={this.onPhoneChange}
                        />
                      </Grid.Column>
                      <Grid.Column>
                        <Form.Input
                          label="Email"
                          type="email"
                          placeholder="Your Email"
                          value={this.state.email}
                          onChange={this.onEmailChange}
                        />
                      </Grid.Column>
                      <Grid.Column>
                        <label for="role">Role</label>
                        <br />
                        <Dropdown
                          style={{ width: "100%" }}
                          selection
                          placeholder="Your Role"
                          options={roleOptions}
                          value={this.state.role}
                          onChange={(e, data) => {
                            this.onRoleChange(data.value);
                          }}
                        />
                      </Grid.Column>
                      <Grid.Column>
                        <Form.Input
                          label="IMEI"
                          type="any"
                          placeholder="Your IMEI"
                          value={this.state.imei}
                          onChange={this.onValueChange}
                        />
                      </Grid.Column>
                      <Grid.Column>
                        <Form.Input
                          label="Pin Code"
                          type="any"
                          placeholder="Your PinCode"
                          value={this.state.pinCode}
                          onChange={this.onPinCodeChange}
                        />
                      </Grid.Column>
                      <Grid.Column>
                        <Form.Input
                          label="Pin"
                          type="any"
                          placeholder="Your Pin"
                          disabled
                          value={this.props.user.pin != null ? this.props.user.pin : "" }
                          onChange={this.onValueChange}
                        />
                      </Grid.Column>
                      <Grid.Column style={{marginTop:"20px"}} spacing={10}>
                        <Button color="teal" onClick = {this.generatePinaction}>Generate Pin</Button>
                        <Button color="orange"onClick = {this.forgotPasswordaction}>Forgot password</Button>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Form>
                    
                {/* <ReactTable
                  noDataText="We couldn't find anything"
                  filterable={true}
                  defaultPageSize={20}
                  sortable={true}
                  style={{ marginTop: "5%", height: "250px" }}
                  columns={column}
                  data={assignedLineItem}
                /> */}
                {/* <div style={{backgroundColor:"brown"}}> */}
                  {this.state.newUser === false && 
                  <Table columns={column} data={assignedItemsForUser} styles={ModalTableStyle}/>
                  }
                  
                  
                  
                {/* </div> */}
               
              </Modal.Content>
              <Modal.Actions>
                <Button color="red" onClick={this.closeEditUser}>
                  <Icon name="remove" /> No
                </Button>

                 <Button color="black" onClick={this.state.newUser ? this.saveNewUser : this.saveEditedUser}>
                  Save
                </Button>
              </Modal.Actions>
            </Modal>
          </div>
        {/* </div> */}
      </div>
    );
  }
}

function AuditTableCell(props) {
  function onClick() {
    props.onClick(props.row);
  }
  return (
    <div style={props.style} onClick={onClick}>
      {props.text}
    </div>
  );
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      fetchUser: fetchUserAction,
      saveUserDetail: saveUserDetailAction,
      AddUsersDetailAction:AddUsersDetailAction,
      setCurrentUser: setCurrentUser,
      fetchAssignedLineItem: fetchAssignedLineItemAction,
      forgotPassword:forgotPasswordAction,
      generatePin: generatePinAction,
      reassignAudit: reassignAuditAction
    },
    dispatch
  );
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(User));
