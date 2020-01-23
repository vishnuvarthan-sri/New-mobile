import React from "react";
import ReactTable from "react-table-6";
import HdfcQuestions from "./HdfcQuestions.jsx";

class HdfcAudits extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      auditsView: true,
    }
  }
  handleTableClick = (audit,props) => {
    console.log(this.state.question)
    this.setState({ selectedAudit: audit, auditsView: false });
  };
  render() {
    const data = [
      {
        name: "Ayaan",
        company:"vknowlabs",
        fileNo:7899999,
        address:"Srp tools",
        extNo:111,
        faxNo: 14524
      },
      {
        name: "Ahana",
        company:"orangeScape",
        fileNo:14578,
        address:"Tharamani",
        extNo:128,
        faxNo: 222222
      },
      {
        name: "Peter",
        company:"vknowlabs",
        fileNo: 889966,
        address:"Baby Nagar",
        extNo:444,
        faxNo: 854712
      },
      {
        name: "Virat",
        company:"guvi",
        fileNo:89654,
        address:"pillayarKovil",
        extNo:114,
        faxNo: 45875
      },
      {
        name: "Rohit",
        company:"CTS",
        fileNo:102545,
        address:"Velachery",
        extNo:113,
        faxNo: 78965
      },
      {
        name: "Dhoni",
        company:"TCS",
        fileNo:2221455,
        address:"Thiruvanmiur",
        extNo:121,
        faxNo: 89657
      }
    ];
    const columns = [
      {
        Header: "Name",
        accessor: "name",
        style: { textAlign: "center", cursor: "pointer" },
        Cell: row =>
        <AuditTableCell
          row={row.original}
          text={row.original.name}
          onClick={this.handleTableClick}
        />
      },
      {
        Header: "File No",
        accessor: "fileNo",
        style: { textAlign: "center", cursor: "pointer" },
        Cell: row =>
        <AuditTableCell
          row={row.original}
          text={row.original.fileNo}
          onClick={this.handleTableClick}
        />
      },
      {
        Header: "Company",
        accessor: "company",
        style: { textAlign: "center", cursor: "pointer" },
        Cell: row =>
        <AuditTableCell
          row={row.original}
          text={row.original.company}
          onClick={this.handleTableClick}
        />
      },
      {
        Header: "Address",
        accessor: "address",
        style: { textAlign: "center", cursor: "pointer" },
        Cell: row =>
        <AuditTableCell
          row={row.original}
          text={row.original.address}
          onClick={this.handleTableClick}
        />
      },
      {
        Header: "Ext No",
        accessor: "extNo",
        style: { textAlign: "center", cursor: "pointer" },
        Cell: row =>
        <AuditTableCell
          row={row.original}
          text={row.original.extNo}
          onClick={this.handleTableClick}
        />
      },
      {
        Header: "Fax No",
        accessor: "faxNo",
        style: { textAlign: "center", cursor: "pointer" },
        Cell: row =>
        <AuditTableCell
          row={row.original}
          text={row.original.faxNo}
          onClick={this.handleTableClick}
        />
      },

    ];
    return (
      <div style={{ flexGrow: 1, display: "flex", flexFlow: "column" }}>
       {this.state.auditsView && 
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
                data={data}
              />
            </div>
          </div>
        </div>}
        {!this.state.auditsView && 
        <div style={{ flexGrow: 1, display: "flex" }}>
        <HdfcQuestions/>
      </div>
        }
      </div>
    );
  }
}
function AuditTableCell(props) {
  function onClick() {
    props.onClick(props.row);
    console.log(props.row);
  }
  return (
    <div style={props.style} onClick={onClick}>
      {props.text}
    </div>
  );
}
export default HdfcAudits;
