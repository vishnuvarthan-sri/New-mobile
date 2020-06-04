import React from "react";
import ReactTable from "react-table-6";
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
      selectedAudit:null
    };
  }
  componentDidMount() {
    this.props.fetchHdfcMasterAction();
  }
  handleTableClick = (audit, props) => {
    this.setState({ selectedAudit: audit, auditsView: false });
  };
  handleCloseClick = () => {
    this.setState({ auditsView: true });
  };
  render() {
    var audits = this.props.hdfc.auditedAudits;

    const columns = [
      {
        Header: "Name",
        accessor: "customerName",
        style: { textAlign: "center", cursor: "pointer" },
        Cell: row => (
          <AuditTableCell
            row={row.original}
            text={row.original.customerName}
            onClick={(row) => {this.handleTableClick(row)}}
            PadRowComponent= {<span>&nbsp;</span>}
          />
        )
      },
      {
        Header: "File No",
        accessor: "fileNo",
        style: { textAlign: "center", cursor: "pointer" },
        Cell: row => (
          <AuditTableCell
            row={row.original}
            text={row.original.fileNo}
            onClick={this.handleTableClick}
            PadRowComponent= {<span>&nbsp;</span>}
          />
        )
      },
      {
        Header: "Company",
        accessor: "nameOfCompany",
        style: { textAlign: "center", cursor: "pointer" },
        Cell: row => (
          <AuditTableCell
            row={row.original}
            text={row.original.nameOfCompany}
            onClick={this.handleTableClick}
            PadRowComponent= {<span>&nbsp;</span>}
          />
        )
      },
      {
        Header: "Address",
        accessor: "address",
        style: { textAlign: "center", cursor: "pointer" },
        Cell: row => (
          <AuditTableCell
            row={row.original}
            text={row.original.address}
            onClick={this.handleTableClick}
            PadRowComponent= {<span>&nbsp;</span>}
          />
        )
      },
      {
        Header: "Ext No",
        accessor: "extNo",
        style: { textAlign: "center", cursor: "pointer" },
        Cell: row => (
          <AuditTableCell
            row={row.original}
            text={row.original.extNo}
            onClick={this.handleTableClick}
            PadRowComponent= {<span>&nbsp;</span>}
          />
        )
      },
      {
        Header: "Fax No",
        accessor: "faxNo",
        style: { textAlign: "center", cursor: "pointer" },
        Cell: row => (
          <AuditTableCell
            row={row.original}
            text={row.original.faxNo}
            onClick={this.handleTableClick}
            PadRowComponent= {<span>&nbsp;</span>}
          />
        )
      },
      {
        Header: "Location",
        accessor: "landmark",
        style: { textAlign: "center", cursor: "pointer" },
        Cell: row => (
          <AuditTableCell
            row={row.original}
            text={row.original.faxNo}
            onClick={this.handleTableClick}
            PadRowComponent= {<span>&nbsp;</span>}
          />
        )
      }
    ];
    return (
      <div style={{ flexGrow: 1, display: "flex", flexFlow: "column" }}>
        {this.state.auditsView && (
          <div>
            <h1 style={{ paddingLeft: 30, flex: "0 0 30px" }}>HDFC Audits</h1>
            <div style={{ display: "flex", flexGrow: 1, flexFlow: "column" }}>
              <div>
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
              </div>
            </div>
          </div>
        )}
        {!this.state.auditsView && (
          <div style={{ flexGrow: 1, display: "flex" }}>
            <HdfcQuestions
              editableAudits={this.state.selectedAudit}
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
