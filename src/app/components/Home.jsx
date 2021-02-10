import React from 'react';
import { Button, Form, Grid, Header, Image, Message, Segment, Card, Icon, Menu, Input,Dropdown } from 'semantic-ui-react'
import { isBrowser } from 'react-device-detect';
import Main from './Maincomponents/Main.jsx';
import { logoutAction } from '../actions/index';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isLoggedIn } from '../util'
import { withRouter } from 'react-router';

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }
   
    logout = () => {
        let token = this.props.location.state.details.accessToken;
        this.props.logout(token)
    }
 
    componentDidUpdate(props){
        if(props.auth.logout){
            this.props.history.push('/login')
        }
        else return;
    }

    componentWillMount() {
        if (!isLoggedIn(this.props.auth)) {
            this.props.history.push(`/login`)
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (!isLoggedIn(nextProps.auth)) {
            this.props.history.push(`/login`)
            return false;
        }
        return true;
    }

    render() {
        console.log(this.props.auth.Name,"The logout reply")
        if (isBrowser) return <Message>The Browser is not supported</Message>

        return (
            <div style={{ height: "100%" }}>
                <Segment raised style={{ backgroundColor: "#fafafa", height: 100 }}>
                    <div style={{ display: "inline-block" }}>
                        <Icon
                            style={{
                                display: "inline-block",
                                cursor: "pointer",
                                float: "left",
                                color: "#606060",
                                marginTop: 4
                            }}
                            size="big"
                            name="bars"
                        />
                    </div>
                   
                </Segment>
                <Segment basic>
                <Menu.Menu
                        style={{ display: "inline", float: "right", marginTop: 8,marginRight:110 }}
                    >
                        <Dropdown pointing >
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={this.logout}>Logout</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Menu.Menu>
                    </Segment>

                <Segment basic
                    style={{
                        height: "100%",
                        display: "flex",
                        padding: "10px 0px 0px 0px",
                        marginTop:70
                    }}
                >
                     
                    {/* <div style={{ paddingLeft: 650,paddingBottom:200, flex: "0 0 450px" }}>
           <p style={{ t extAlign:'center' }}> <b>{this.state.message}</b></p> 
           </div> */}
                    <Main />
                </Segment>
            </div>


        );

    }


}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
    };
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        logout: logoutAction,
    }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));