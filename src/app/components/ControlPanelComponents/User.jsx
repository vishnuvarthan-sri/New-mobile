import React, { Component } from "react";
import ReactTable from "react-table-6";
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

export class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      name: "",
      phone: "",
      email: "",
      role: "",
      imei: "",
      pin: ""
    };
  }
  editUserDetail = data => {
    this.setState({
      editMode: true,
      name: data.name,
      phone: data.phone,
      email: data.email,
      role: data.role,
      imei: data.imei,
      pin: data.pin
    });
  };
  closeEditUser = () => {
    this.setState({ editMode: false });
  };
  render() {
    const data = [
      {
        name: "Ayaan",
        email: "ayan@gmail.com",
        phone: 7896541225,
        role: "F.E",
        imei: "IMEKIF878452",
        pin: 7854
      },
      {
        name: "Ahana",
        email: "ahana@gmail.com",
        phone: 8888888888,
        role: "F.E",
        imei: "AHANA8452",
        pin: 1547
      },
      {
        name: "Peter",
        email: "peter@gmail.com",
        phone: 7777777777,
        role: "Admin",
        imei: "PETER78952",
        pin: 7854
      },
      {
        name: "Virat",
        email: "virat@gmail.com",
        phone: 6666666666,
        role: "F.E",
        imei: "VIRAT878452",
        pin: 1111
      },
      {
        name: "Rohit",
        email: "rohit@gmail.com",
        phone: 5555555555,
        role: "Q.C",
        imei: "ROHIT878452",
        pin: 8965
      },
      {
        name: "Dhoni",
        email: "dhoni@gmail.com",
        phone: 44444444444,
        role: "F.E",
        imei: "IMEKIF878452",
        pin: 7854
      }
    ];
    const dat = [
      {
        name: "Dhoni",
        email: "dhoni@gmail.com",
        phone: 44444444444,
        role: "F.E",
        imei: "IMEKIF878452",
        pin: 7854
      }
    ];
    const options = [
      { key: 1, text: "Choice 1", value: 1 },
      { key: 2, text: "Choice 2", value: 2 },
      { key: 3, text: "Choice 3", value: 3 }
    ];
    const columns = [
      {
        Header: "Name",
        accessor: "name",
        style: { textAlign: "center", cursor: "pointer" }
        // Cell: row => (
        //   <AuditTableCell row={row.original} text={row.original.name} />
        // )
      },
      {
        Header: "Email",
        accessor: "email",
        style: { textAlign: "center", cursor: "pointer" }
        // Cell: row => (
        //   <AuditTableCell row={row.original} text={row.original.email} />
        // )
      },
      {
        Header: "PhoneNumber",
        accessor: "phone",
        style: { textAlign: "center", cursor: "pointer" }
        // Cell: row => (
        //   <AuditTableCell row={row.original} text={row.original.phone} />
        // )
      },
      {
        Header: "Role",
        accessor: "role",
        style: { textAlign: "center", cursor: "pointer" }
        // Cell: row => (
        //   <AuditTableCell
        //     row={row.original}
        //     text={row.original.role}

        //   />
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
        accessor: "name",
        style: { textAlign: "center", cursor: "pointer" }
        // Cell: row => (
        //   <AuditTableCell row={row.original} text={row.original.name} />
        // )
      },
      {
        Header: "Email",
        accessor: "email",
        style: { textAlign: "center", cursor: "pointer" }
        // Cell: row => (
        //   <AuditTableCell row={row.original} text={row.original.email} />
        // )
      },
      {
        Header: "PhoneNumber",
        accessor: "phone",
        style: { textAlign: "center", cursor: "pointer" }
        // Cell: row => (
        //   <AuditTableCell row={row.original} text={row.original.phone} />
        // )
      },
      {
        Header: "Role",
        accessor: "role",
        style: { textAlign: "center", cursor: "pointer" }
        // Cell: row => (
        //   <AuditTableCell
        //     row={row.original}
        //     text={row.original.role}

        //   />
        // )
      },
      {
        Header: "Reassign",
        accessor: "role",
        Cell: row => (
          <Dropdown
            selectOnNavigation={false}
            className="react-table-dropdown"
            placeholder=""
            fluid
            search
            selection
            options={options}
          />
        )
      }
    ];
    return (
      <div style={{ flexGrow: 1, display: "flex", flexFlow: "column" }}>
        <div>
          <h1 style={{ paddingLeft: 30, flex: "0 0 30px" }}>User Details</h1>
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
            <Modal
              open={this.state.editMode}
              onClose={this.closeEditUser}
              size="large"
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
                        />
                      </Grid.Column>
                      <Grid.Column>
                        <Form.Input
                          label="PhoneNumber"
                          type="any"
                          placeholder="Your phone number"
                          value={this.state.phone}
                        />
                      </Grid.Column>
                      <Grid.Column>
                        <Form.Input
                          label="Email"
                          type="email"
                          placeholder="Your Email"
                          value={this.state.email}
                        />
                      </Grid.Column>
                      <Grid.Column>
                        <Form.Input
                          label="Role"
                          type="text"
                          placeholder="Your Role"
                          value={this.state.role}
                        />
                      </Grid.Column>
                      <Grid.Column>
                        <Form.Input
                          label="IMEI"
                          type="any"
                          placeholder="Your IMEI"
                          value={this.state.imei}
                        />
                      </Grid.Column>
                      <Grid.Column>
                        <Form.Input
                          label="Pin"
                          type="any"
                          placeholder="Your Pin"
                          value={this.state.pin}
                        />
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Form>

                <ReactTable
                  noDataText="We couldn't find anything"
                  filterable={true}
                  defaultPageSize={20}
                  sortable={true}
                  style={{ marginTop: "5%", height: "250px" }}
                  columns={column}
                  data={dat}
                />
              </Modal.Content>
              <Modal.Actions>
                <Button color="red" onClick={this.closeEditUser}>
                  <Icon name="remove" /> No
                </Button>

                <Button color="black">Save</Button>
              </Modal.Actions>
            </Modal>
          </div>
        </div>
      </div>
    );
  }
}

export default User;
