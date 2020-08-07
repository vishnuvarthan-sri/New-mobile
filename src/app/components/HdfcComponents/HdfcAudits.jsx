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
import { Button, Modal, Dropdown, Loader } from "semantic-ui-react";
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
  <Table.Table {...restProps} className="table-striped" />
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
      columnsNeeded: ["customerName", "fileNo", "status", "address"],
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
                  title: data,
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
        let neededColumn = Object.keys(nextprops.user.allUsers[0]);
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
  assignAudits = (data, rowObject) => {
    let initialIds = [];

    if (this.state.selectedRowsData) {
      this.state.selectedRowsData.forEach((el) => {
        initialIds.push(el._id);
      });
    }

    var data = {
      userId: data,
      initialAuditsId: initialIds,
    };
    this.props.unAssignAuditsAction(data);
    this.filterAudits();

    this.setState({
      openUnassignedModal: false,
      enable: true,
    });
  };

  handleChangeFromDate = (date) => {
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

  render() {
    console.log(
      this.state.auditsView,
      this.state.audit,
      this.state.columns,
      "load"
    );
    let userOptions = [];
    {
      this.props.user.allUsers &&
        this.props.user.allUsers.map((name) => {
          if (name.role === "fieldExecutives") {
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
        });
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
        <div style={{ flexGrow: 1, display: "flex", flexFlow: "column" }}>
          {this.props.hdfc.isLoading === false &&
            this.state.auditsView === true && (
              <div
                style={{
                  height: "875px",
                  width: "100%",
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
                {this.state.openUnassignedModal === false ? (
                  <Button
                    color="teal"
                    style={{ display: "inline-block", marginLeft: "1100px" }}
                    onClick={this.openUnassignedModal}
                    disabled={this.state.enable}
                  >
                    Assign Audits
                  </Button>
                ) : (
                  <Dropdown
                    placeholder=""
                    fluid
                    search
                    selection
                    onChange={(e, data, row) => {
                      this.assignAudits(data.value, this.state.auditId);
                    }}
                    style={{
                      width: "180px",
                      display: "inline-block",
                      float: "right",
                      marginRight: "-25px",
                    }}
                    options={userOptions}
                  />
                )}
                <div
                  style={{
                    margin: "auto",
                    width: "50%",
                    padding: 10,
                  }}
                >
                  <div style={{ display: "inline-block", marginLeft: "90px" }}>
                    <label for="from">From</label>
                    <br />
                    <DatePicker
                      selected={this.state.fromDate}
                      onChange={this.handleChangeFromDate}
                    />
                  </div>
                  <div style={{ display: "inline-block", marginLeft: "60px" }}>
                    <label for="to">To</label>
                    <br />
                    <DatePicker
                      selected={this.state.toDate}
                      onChange={this.handleChangeToDate}
                    />
                  </div>
                  <div style={{ display: "inline-block", marginLeft: "40px" }}>
                    <Button color="teal" onClick={this.filterAudits}>
                      FilterAudits
                    </Button>
                  </div>
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
                          defaultCurrentPage={0}
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
