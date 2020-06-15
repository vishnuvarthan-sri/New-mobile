import React from "react";
// import ReactTable from "react-table";
import Table from '../Table.jsx'
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { fetchHdfcMasterAction } from "../../actions/hdfc_action";
import HdfcQuestions from "./HdfcQuestions.jsx";

class HdfcAudits extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      auditsView: true,
      selectedAudit:null,
      audit:[],
      rowObject: {},
    };
  }
  componentDidMount() {
    this.props.fetchHdfcMasterAction();
  }
  componentWillReceiveProps(nextprops){
    if(this.props.hdfc.auditedAudits !== nextprops.hdfc.auditedAudits){
      
      this.setState({
        audit:[...nextprops.hdfc.auditedAudits]
      })
    }

  }
  handleTableClick = (audit, props) => {
    this.setState({ selectedAudit: audit, auditsView: false });
  };
  handleCloseClick = () => {
    this.setState({ auditsView: true });
  };
  rowInfo = (rowobject) => {
    
    this.setState({
      openModal: true,
      rowObject: rowobject.original,
      auditsView: false
    });
  };

  render() {


    var auditedData = this.state.audit.length !== 0 ? this.state.audit:[]
  

    const columns = [
      {

        Header: "Name",
        accessor: "customerName",
      },
      {
        Header: "File No",
        accessor: "fileNo",
      },
      {
        Header: "Address",
        accessor: "address",
      },
      {
        Header: "SR No",
        accessor: "srno",
      },
      {
        Header: "Unit Name",
        accessor: "unitName",
      },
      {
        Header: "Origin Mode",
        accessor: "originMode",
      }
    ];
    return (
      <div style={{ flexGrow: 1, display: "flex", flexFlow: "column" }}>
        {this.state.auditsView && (
          <div>
            <h1 style={{ paddingLeft: 30, flex: "0 0 30px" }}>HDFC Audits</h1>
            {/* <div style={{ display: "flex", flexGrow: 1, flexFlow: "column" }}> */}
              {/* <div>
                <ReactTable
                  noDataText="We couldn't find anything"
                  filterable={true}
                  defaultPageSize={20}
                  sortable={true}
                  style={{ height: "85%", width: "95%", marginLeft: 30 }}
                  columns={columns}
                  data={audits}
                  PadRowComponent= {<span>&nbsp;</span>}
                />
              </div> */}
              <div style={{height:"900px"}}>
              <Table columns={columns} data={auditedData}           rowInfo={this.rowInfo}
/>
              {/* </div> */}
            </div>
          </div>
        )}
        {!this.state.auditsView && (
          <div style={{ flexGrow: 1, display: "flex" }}>
            <HdfcQuestions
              editableAudits={this.state.rowObject}
              onClose={this.handleCloseClick}
            />
          </div>
        )}
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
    home: state.home,
    hdfc: state.hdfc
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      fetchHdfcMasterAction: fetchHdfcMasterAction
    },
    dispatch
  );
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HdfcAudits)
);
