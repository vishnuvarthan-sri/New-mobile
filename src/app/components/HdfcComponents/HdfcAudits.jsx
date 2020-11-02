import React from "react";
// import ReactTable from "react-table";
// import Table from "../Table.jsx";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Getter } from "@devexpress/dx-react-core";
import {
  Template,
  TemplatePlaceholder,
  TemplateConnector,
} from "@devexpress/dx-react-core";
import {
  SelectionState,
  PagingState,
  IntegratedPaging,
  IntegratedSelection,
  EditingState,
  FilteringState,
  IntegratedFiltering,
} from "@devexpress/dx-react-grid";
import {
  Grid,
  VirtualTable,
  Table,
  // TableView,
  TableHeaderRow,
  TableEditRow,
  TableEditColumn,
  TableSelection,
  PagingPanel,
  TableFilterRow,
} from "@devexpress/dx-react-grid-bootstrap4";
// import '@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css';
import {
  fetchHdfcMasterAction,
  fetchUnassignedData,
} from "../../actions/hdfc_action";
import {
  fetchUserAction,
  unAssignAuditsAction,
} from "../../actions/user_action";
import HdfcQuestions from "./HdfcQuestions.jsx";
// import MomentUtils from "@date-io/moment";
// import {MuiPickersUtilsProvider } from "@material-ui/pickers";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { Button, Modal, Dropdown, Loader, Label, ModalActions, Form } from "semantic-ui-react";
// import "@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css";
const tableStyle = {
  width: "100%",
  marginLeft: "-20px",
  textAlign: "center",
  padding: "0",
};

const getRowId = (row) => {
  return row._id;
};

const TableComponent = ({ ...restProps }) => (
  <Table.Table {...restProps}  />
);

class HdfcAudits extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      auditsView: true,
      columns: [],
      audit: [],
      rowObject: {},
      openUnassignedModal: false,
      unassigned: [],
      columnsNeeded: ["customerName", "fileNo", "status", "pinCode"],
      showDropdown: false,
      auditId: "",
      selection: [],
      selectedRowsData: [],
      userNameColumns: [],
      userNameColumnsNeeded: ["displayName"],
      userName: [],
      enable: true,
      pageSizes: [5, 10, 15],
      fromDate: new Date(),
      toDate: new Date(),
      isLoading: "",
      userId: "",
    };

    this.changeSelection = (selection) => {
      this.setState({
        selection,
        selectedRowsData: this.state.audit.filter(
          (row) =>
            selection.findIndex((selectId) => selectId === getRowId(row)) !== -1
        ),
        enable: false,
      });
    };
  }
  componentDidMount() {
    let From = this.state.fromDate;
    let To = this.state.toDate;
    let startDate =
      From.getDate() + "-" + (From.getMonth() + 1) + "-" + From.getFullYear();
    let endDate =
      To.getDate() + "-" + (To.getMonth() + 1) + "-" + To.getFullYear();
    this.props.fetchHdfcMasterAction(startDate, endDate);
    this.props.fetchUserAction();
  }
  componentWillReceiveProps(nextprops) {
    let columns = this.state.columns;
    let columnsNeeded = this.state.columnsNeeded;
    let userNameColumns = this.state.userNameColumns;
    let userNameColumnsNeeded = this.state.userNameColumnsNeeded;
    let selection = this.state.selection;
    let audit = this.state.audit;

    if (this.props.hdfc.auditedAudits !== nextprops.hdfc.auditedAudits) {
      audit = [];
      selection = [];
      columns = [];
      if (nextprops.hdfc.auditedAudits.length) {
        let value = Object.keys(nextprops.hdfc.auditedAudits[0]);

        if (value.length) {
          value.forEach((data) => {
            columnsNeeded.forEach((el) => {
              if (data === el) {
                columns.push({
                  name: data,
                  title: data.charAt(0).toUpperCase() + data.slice(1)
                });
              }
            });
          });
        }
      }

      this.setState({
        columns,
        audit: nextprops.hdfc.auditedAudits,
        selection,
      });
    }

    if (this.props.hdfc.isLoading !== nextprops.hdfc.isLoading) {
      this.setState({
        isLoading: nextprops.hdfc.isLoading,
      });
    }
    if (this.props.hdfc.unassigned !== nextprops.hdfc.unassigned) {
      this.setState({
        unassigned: nextprops.hdfc.unassigned,
      });
    }

    if (this.props.user !== nextprops.user) {
      if (nextprops.user.allUsers) {
        let neededColumn = Object.keys(nextprops.user.allUsers[0] != null ? nextprops.user.allUsers[0]:{});
        neededColumn.forEach((data) => {
          userNameColumnsNeeded.forEach((el) => {
            if (el === data) {
              userNameColumns.push({
                name: data,
                title: data,
              });
            }
          });
        });
      }

      this.setState({
        userNameColumns,
        userName: nextprops.user.allUsers,
      });
    }
  }

  TableRow = ({ row, ...restProps }) => (
    <Table.Row
      {...restProps}
      onClick={() => {
        this.setState({
          auditsView: false,
          selectedRowsData: row,
        });
      }}
      style={{
        cursor: "pointer",
      }}
    />
  );

  handleTableClick = (audit, props) => {
    this.setState({ selectedAudit: audit, auditsView: false });
  };
  handleCloseClick = () => {
    this.setState({ auditsView: true, selection: [], enable: true });
  };

  openUnassignedModal = () => {
    this.props.fetchUnassignedData();
    this.setState({
      openUnassignedModal: true,
    });
  };

  closeUnassignedModal = () => {
    this.setState({
      openUnassignedModal: false,
      audit: [],
    });
  };
  submitUnassigned = () => {
    this.setState({
      openUnassignedModal: false,
    });
  };
  showDropdown = (e) => {
    this.setState({
      showDropdown: true,
    });
  };
  assignAudits = (data) => {
    this.setState({
      userId: data,
    });
  };

  assignSubmit = () => {
    let initialIds = [];
    console.log(typeof this.state.selectedRowsData);
    if (this.state.selectedRowsData.length !== 0) {
      this.state.selectedRowsData.forEach((el) => {
        initialIds.push(el._id);
      });
    }

    var data = {
      userId: this.state.userId,
      initialAuditsId: initialIds.length ? initialIds : [],
    };
    this.props.unAssignAuditsAction(data);
    this.filterAudits();
    this.setState({
      openUnassignedModal: false,
      enable: true,
    });
  };

  handleChangeFromDate = (date) => {
    console.log(date)
    this.setState({
      fromDate: date,
    });
  };

  handleChangeToDate = (date) => {
    this.setState({
      toDate: date,
    });
  };

  filterAudits = () => {
    let From = this.state.fromDate;
    let To = this.state.toDate;
    let startDate =
      From.getDate() + "-" + (From.getMonth() + 1) + "-" + From.getFullYear();
    let endDate =
      To.getDate() + "-" + (To.getMonth() + 1) + "-" + To.getFullYear();
    this.props.fetchHdfcMasterAction(startDate, endDate);
  };
  close = () => {
    this.setState({
      openUnassignedModal: false
    })
  }
  checkStatus(status) {
    return (status === "initial" || status === "assigned");
  }


  render() {
    let userOptions = [];
    let status = [];
    let disable = true;
    // console.log(this.state.selectedRowsData,"selectable")
    console.log(typeof this.state.selectedRowsData);

    // console.log(())

    {
      this.props.user.allUsers &&
        this.props.user.allUsers.map((name) => {
          console.log(name)
          if (name != null){
          if (name.role === "fieldExecutives") {
            userOptions.push({
              key: name._id,
              text: name.displayName,
              value: name._id,
            });
          }
          if (name.role === "vendor") {
            userOptions.push({
              key: name._id,
              text: name.displayName,
              value: name._id,
            });
          }
          if (name.role === "qualityControlAgents") {
            userOptions.push({
              key: name._id,
              text: name.displayName,
              value: name._id,
            });
          }
        }
        });
    }
    if (Array.isArray(this.state.selectedRowsData)) {
      if (this.state.selectedRowsData.length !== 0) {
        this.state.selectedRowsData.forEach((data) => {
          status.push(data.status);
        });
      }
    }

    return (
      <div>
        {this.props.hdfc.isLoading === true && (
          <div style={{ height: "875px", width: "2200px" }}>
            <Loader
              style={{ marginTop: "10px", marginRight: "100px" }}
              active={this.props.hdfc.isLoading}
              size="big"
            >
              Loading...
            </Loader>
          </div>
        )}
        <div style={{width:"2100px"}}>
          {this.props.hdfc.isLoading === false &&
            this.state.auditsView === true && (this.state.audit.length === 0 || this.state.audit.length > 0) && (
              <div
                style={{
                  height: "875px",
                  width: "72%",
                  marginLeft: "50px",
                }}
              >
                <h1
                  style={{
                    paddingLeft: 30,
                    flex: "0 0 30px",
                    display: "inline-block",
                    color: "orange",
                  }}
                >
                  HDFC Audits
                </h1>

                <div
                  style={{
                    margin: "auto",
                    width: "50%",
                    // padding: 10,
                    // border: "1px solid black",
                  }}
                >
                  <div style={{ display: "inline-block"}}>
                    <Label color="orange" size="medium"><span style={{fontSize:"14px"}}>From</span></Label>
                  </div>
                  <div style={{ display: "inline-block", marginLeft: "5px" }}>
                    <DatePicker
                      selected={this.state.fromDate}
                      onChange={this.handleChangeFromDate}
                    />
                  </div>
                  <div style={{ display: "inline-block", marginLeft: "10px" }}>
                    <Label color="orange" size="medium"><span style={{fontSize:"14px"}}>To</span></Label>
                  </div>
                  <div style={{ display: "inline-block", marginLeft: "5px" }}>
                    <DatePicker
                      selected={this.state.toDate}
                      onChange={this.handleChangeToDate}
                    />
                  </div>
                  <div style={{ display: "inline-block", marginLeft: "10px" }}>
                    <Label
                      color="teal"
                      size="medium"
                      style={{ cursor: "pointer" }}
                      onClick={this.filterAudits}
                    >
                      {/* FilterAudits */}
                      <span style={{fontSize:"14px"}}>Filter Audits</span>
                    </Label>
                  </div>
                  <div style={{ display: "inline-block", marginLeft: "10px" }}>
                    
                      <Button
                        color="teal"
                        size="mini"
                        style={{ cursor:"ponter" }}
                        onClick={this.openUnassignedModal}
                        disabled={
                          status.every(this.checkStatus) === true ? false : true
                        }
                      >
                        <span style={{fontSize:"14px"}}>Assign Audits</span>
                      </Button>
                  
                      <Modal open={this.state.openUnassignedModal} size="tiny" style={{height:"300px",marginLeft:"37%",marginTop:"10%"}}>
                       <Modal.Header>
                       <Label color="orange" ><span style={{fontSize:"14px"}}>Assign To Users</span></Label> 
                       </Modal.Header>
                        <Modal.Content>
                         
                       <div style={{height:"100px"}}>
                       <Dropdown
                        placeholder=""
                        fluid
                        search
                        selection
                        onChange={(e, data, row) => {
                          this.assignAudits(data.value, this.state.auditId);
                        }}
                        style={{
                          width: "150px",
                          display: "inline-block",
                          // // float: "right",
                          // // marginRight: "-25px",

                          marginLeft:"180px"
                        }}
                        options={userOptions}
                      />
                       </div>
                        
                        </Modal.Content>
                        <Modal.Actions style={{marginTop:"15px"}}>
                          <Button primary onClick={this.assignSubmit}>Save</Button>
                          <Button color="red" onClick={this.close}>Cancel</Button>
                        </Modal.Actions>
                      </Modal>
                     
                    
                  </div>
                  {/* {this.state.openUnassignedModal === true && (
                    <div style={{ display: "inline-block", marginLeft: "3px" }}>
                      <Label color="teal" onClick={this.assignSubmit} size="medium">
                        
                        <span style={{fontSize:"14px"}}>Submit</span>
                      </Label>
                    </div>
                  )} */}
                </div>

                {this.props.hdfc.isLoading === false &&
                  this.state.auditsView === true &&
                  this.state.columns.length > 0 &&
                  this.state.audit.length > 0 && (
                    <div
                      style={{
                        width: "95%",
                        padding: "1%",
                        marginLeft: "15px",
                        marginTop: "25px",
                      }}
                    >
                      <Grid
                        columns={this.state.columns}
                        rows={this.state.audit}
                        getRowId={getRowId}
                      >
                        <PagingState
                          // defaultCurrentPage={0}
                          defaultPageSize={15}
                        />
                        <FilteringState />
                        <IntegratedFiltering />
                        <SelectionState
                          selection={this.state.selection}
                          onSelectionChange={this.changeSelection}
                        />
                        <IntegratedPaging />
                        <IntegratedSelection />

                        <Table
                          align="center"
                          tableComponent={TableComponent}
                          rowComponent={this.TableRow}
                        />
                        <TableHeaderRow />

                        <TableFilterRow />
                        <Template name="root">
                          <TemplateConnector>
                            {({ rows: filteredRows }) => {
                              return <TemplatePlaceholder />;
                            }}
                          </TemplateConnector>
                        </Template>
                        <TableSelection showSelectAll />
                        <PagingPanel pageSizes={this.state.pageSizes} />
                      </Grid>
                    </div>
                  )}
              </div>
            )}
          {this.state.auditsView === false && (
            <div style={{ flexGrow: 1, display: "flex" }}>
              <HdfcQuestions
                editableAudits={this.state.selectedRowsData}
                onClose={this.handleCloseClick}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    home: state.home,
    hdfc: state.hdfc,
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      fetchHdfcMasterAction: fetchHdfcMasterAction,
      fetchUnassignedData: fetchUnassignedData,
      fetchUserAction: fetchUserAction,

      unAssignAuditsAction: unAssignAuditsAction,
    },
    dispatch
  );
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HdfcAudits)
);
