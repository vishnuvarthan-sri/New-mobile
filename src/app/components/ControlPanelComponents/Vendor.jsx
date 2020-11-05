import React, { Component } from "react";

import {
  Container,
  Segment,
  Input,
  Icon,
  Label,
  Form,
  Grid,
  Modal,
  Checkbox,
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
// import ReactTable from "react-table-stable";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import {
  fetchVendorAction,
  saveVendorDetailAction,
  AddVendorDetailAction,
  setCurrentVendor,
  fetchAuditorAction,
  deleteVendorAction
} from "../../actions/vendor_action";
import {fetchAssignedLineItemAction} from "../../actions/user_action";
import { isLoggedIn, isAdmin } from "./../../util";
import { SemanticToastContainer, toast } from 'react-semantic-toasts';
import 'react-semantic-toasts/styles/react-semantic-alert.css';
const ModalTableStyle = {
  width:"100%",
  marginLeft:"-10px",
  textAlign:"center",
  padding:"0"
}
const controlPanelTableStyle = {
  width:"90%",
  borderSpacing: 0,
  border: '1px solid #dde0e5',
  marginLeft: '80px',
  marginTop: "2%",
  outline: "thick"
}


function removeDuplicates(originalArray, prop) {
  var newArray = [];
  var lookupObject = {};

  for (var i in originalArray) {
    if (originalArray[i][prop]) {
      lookupObject[originalArray[i][prop]] = originalArray[i];
    }
  }

  for (i in lookupObject) {
    newArray.push(lookupObject[i]);
  }

  return newArray;
}




export class Vendor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      id:"",
      name: "",
      phone: "",
      pinCode:'',
      email: "",
      role: "",
      saveError: false,
      newUser: false,
      selectedAuditor : null,
      checked: false,
      auditId: null,
      totalUsers: [],
      assignedItemsForUser:[],
      showTable: false,
      SelectedMembers:[],
      allUser:[],
      button : ''
    };
  }
  componentDidMount() {
    this.props.fetchUser();
  }
  componentWillReceiveProps(nextprops){
  
    var reassign = "";
    if(nextprops.vendor.allUsers !== this.props.vendor.allUsers){
      
      this.setState({
        totalUsers: [...nextprops.vendor.allUsers]
      })
    }
    if(nextprops.vendor.assignedLineItem != this.props.vendor.assignedLineItem){
     
      nextprops.vendor.assignedLineItem.map((id)=>{
         reassign  = id._id;
      })
      this.setState({
        auditId: reassign,
        assignedItemsForUser:[...nextprops.vendor.assignedLineItem]
      })
    }
    if(nextprops.vendor.currentVendor !== this.props.vendor.currentVendor){
      this.setState({
        allUser: nextprops.vendor.currentVendor
      })
    }
    
  }

  addNewUser = () => {
    var newUser = {};
    newUser.displayName = "";
    newUser.mobileNo = "";
    newUser.email = "";
    newUser.role = "";
    newUser.imei = "";
    newUser.auditors = []
    this.props.setCurrentVendor(newUser);
    this.props.fetchAuditorAction();
    this.setState({
      editMode: true,
      newUser: true,
      button:'',
      name: "",
      phone: "",
      email: "",
      imei: "",
      pinCode:"",
      SelectedMembers:[]
    });
  }
  editUserDetail = data => {
  
    if(data !== undefined){
      console.log(data,"dataaaaaaaaaaaaaaaaaaaaaaaaaaa")
      const userId = data.original._id;
      this.props.fetchAuditorAction();
      this.setState({
        editMode: true,
        id: data.original._id
  ,     name: data.original.displayName,
        phone: data.original.mobileNo,
        role:data.original.role,
        pinCode : data.original.pinCode,
        email: data.original.email,
        button : 'visible',
        allUser:{
          auditors: data.original.auditors
        },

        newUser: false
      });
    }

   
  };
  saveEditedUser = () => {
    var user = this.state.allUser;
    user.displayName = this.state.name;
    user.mobileNo = this.state.phone;
    user.email = this.state.email;
    user.pinCode = this.state.pinCode;
    user.role = this.state.role;
    this.props.setCurrentVendor(user);
    // console.log(user,'llll')
    this.props.saveVendorDetailAction(user);
    this.setState({ newUser: {}, editMode: false, saveError: false });
  };
  saveNewUser = () => {
    var user = this.state.allUser;
    user.displayName = this.state.name;
    user.mobileNo = this.state.phone;
    user.email = this.state.email;
    user.role =  this.state.role;
    user.pinCode = this.state.pinCode;
    this.props.setCurrentVendor(user);
    // console.log(user,"saveeeeeeeeeeeeeeeeeeeeeeeeeeee")
    this.props.AddVendorDetailAction(user);
   
    this.setState({ newUser: {}, editMode: false, saveError: false, newUser: false,SelectedMembers:[]  });
  };
  reassignAudits = (data) => {
    let userId = ""
    if(this.props.vendor.allUsers && this.props.vendor.allUsers.map((id)=>{
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
  onPinCodeChange = e => {
    this.setState({pinCode:e.target.value});
  }
  
  onRoleChange = data => {
    this.setState({ role: data });
  };
  closeEditUser = () => {
    this.setState({ editMode: false });
  };

  labelClick = auditorId => {
    // console.log(auditorId)
    this.setState({ selectedAuditor: auditorId, checked:false });
  };

  handleClick = auditorId => {
   
    let selectedAuditor = this.state.selectedAuditor;
    let SelectedMembers = this.state.SelectedMembers
    let  aud = []
    // console.log(SelectedMembers,"Selected memebers")
    var user = this.state.allUser;
    let auditors = this.props.vendor.auditors;
    if(auditors.length > 0){
      if(user.auditors.length === 0){
        auditors.forEach((data) => {
          if(data._id === auditorId){
            SelectedMembers.push({
              auditorId: auditorId,
              isChecked: true
            })
          }else if(auditorId !== data._id ){
            SelectedMembers.push({
              auditorId: data._id,
              isChecked: false
            })
          }
        })
        user.auditors = SelectedMembers
        this.props.setCurrentVendor(user);
      }else {
        let audit = this.state.allUser.auditors
        audit.forEach((data) => {
          if(data.auditorId === auditorId){
            data.isChecked === false ? data.isChecked = true : data.isChecked = false
            // console.log(data,"{}{}{}{}{}")
          }
        })
        // console.log(audit,"auditttttttttttttttt")
        user.auditors = audit
        this.props.setCurrentVendor(user)
        // this.setState
      }

    }
    // console.log(this.props.vendor.currentVendor)

     


      // console.log(user,"present herrrrrrrrrrrrrr")
    this.setState({
      selectedAuditor: auditorId,
      showSearchAndSelectall: true,
      SelectedMembers,
      checked: false
    });
    
  };

  handleChange = () => {
    this.setState({checked:false})
  }

  deleteUserDetail = () => {
    // if (data != undefined){
      // console.log(data.original,"asaaaaaaaaa")
      this.props.deleteVendorAction(this.state.id)
      window.location.reload(false)
    // }
    
  }

  render() {
    console.log(this.state.allUser)
  //  console.log(this.state.SelectedMembers,"state.selectedMemebers")
    let userData = this.state.totalUsers.length !== 0 ? this.state.totalUsers : []
    // console.log(userData,"users")
    let assignedItemsForUser = this.state.assignedItemsForUser

    let userOptions = [];
    {this.props.vendor.allUsers && this.props.vendor.allUsers.map((name)=>{
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
      { key: 3, value: "fieldExecutives", text: "fieldExecutives" },
      { key:4, value:"vendor" ,text : "vendor"}
    ];
    const columns = [
      {
        Header: "Name",
        accessor: "displayName"
      },
      {
        Header: "Email",
        accessor: "email"
      },
      {
        Header: "PhoneNumber",
        accessor: "mobileNo",
        style: { textAlign: "center", cursor: "pointer" },
      },
      // {
      //   Header: "Pin Code",
      //   accessor: "pinCode",
      //   style: { textAlign: "center", cursor: "pointer" },
      // },
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
    console.log(columns)
    return (
      <div style={{ flexGrow: 1, display: "flex", flexFlow: "column" }}>
        <div>
          <h1 style={{ paddingLeft: 30, flex: "0 0 30px",display:"inline-block" }}>Vendor Details</h1>
          <Label style={{marginLeft:"76%", cursor:"pointer"}} size="large" color="orange" onClick={this.addNewUser} >
           
          <Icon name="user plus"/>
            AddVendors</Label>
            <div>
              <Table columns={columns} data = {userData} rowInfo={this.editUserDetail} styles={controlPanelTableStyle}
              />
            </div>
            <Modal
              open={this.state.editMode}
              onClose={this.closeEditUser}
              size = "small"
              style={{marginTop:200,marginLeft:400,height:400}}
              // size={this.state.newUser === false ? "fullscreen": this.state.newUser === true ? "large":"large"}
            >
              <Modal.Content>

                <Form>
                  <Grid columns={3}>
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
                        <Form.Input
                          label="Pin Code"
                          type="any"
                          style ={{paddingBottom:50}}
                          placeholder="Your PinCode"
                          value={this.state.pinCode}
                          onChange={this.onPinCodeChange}
                        />
                      </Grid.Column>
                   
                      <Grid.Column style={{ marginTop: "5%" }}>
                      <Segment.Group
                        style={{ overflow: "auto", maxHeight: 200 }}
                      >
                        <Menu.Header as="h4" style={{ textAlign: "center" }}>
                          Auditors
                        </Menu.Header>
                        {/* mapping orgs model refer here */}
                        {
                        this.props.vendor.auditors &&
                          this.props.vendor.auditors.map((auditors,index )=> {
                            // console.log(auditors._id)
                            
                           
                            return (
                              <Segment>
                                <Form>
                                  <Form.Field>
                                    <Label
                                      style={{ width: "100%" }}
                                      
                                      onClick={() => {
                                        this.labelClick(auditors._id);
                                      }}
                                    >
                                      <Checkbox
                                        style={{ paddingLeft: "30%" }}
                                        label={auditors.displayName}
                                        name="checkboxRadioGroup"
                                        value="this"
                                        // checked={this.state.allUser.length > 0? this.state.allUser[index] !== undefined && this.state.allUser[index].auditorId === auditors._id && console.log(this.state.allUser[index])
                                        // : false}
                                        checked = {this.state.allUser.auditors !== undefined && this.state.allUser.auditors.length > 0 ? this.state.allUser.auditors[index] !== undefined && this.state.allUser.auditors[index].auditorId === auditors._id && this.state.allUser.auditors[index].isChecked:""}
                                        // checked = {this.state.SelectedMembers.length > 0 ?console.log(this.state.SelectedMembers[]):console.log("false")}
                                        onChange={this.handleChange}
                                        onClick={() => {
                                          this.handleClick(auditors._id);
                                        }}
                                        style={{ margin: 0 }}
                                      />
                                    </Label>
                                  </Form.Field>
                                </Form>
                              </Segment>
                            );
                          })}
                      </Segment.Group>
                    </Grid.Column>
                  
                    </Grid.Row>
                  </Grid>
                </Form>
              </Modal.Content>
              <Modal.Actions>
             
             

                 <Button color="black" onClick={this.state.newUser ? this.saveNewUser : this.saveEditedUser}>
                  Save User
                </Button>
                <Button color="red" onClick={this.closeEditUser}>
                  <Icon name="remove" /> Cancel
                </Button>
                {this.state.button == 'visible' &&
                <Button color="black"  onClick={this.deleteUserDetail}>
                  Delete User
                </Button>
                    }
               
              </Modal.Actions>
            </Modal>
          </div>
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
    vendor:state.vendor,
    user:state.user
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      fetchUser: fetchVendorAction,
      saveVendorDetailAction:  saveVendorDetailAction,
      AddVendorDetailAction:AddVendorDetailAction,
      setCurrentVendor:setCurrentVendor,
      fetchAuditorAction:fetchAuditorAction,
      fetchAssignedLineItem:fetchAssignedLineItemAction,
      deleteVendorAction:deleteVendorAction
    },
    dispatch
  );
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Vendor));
