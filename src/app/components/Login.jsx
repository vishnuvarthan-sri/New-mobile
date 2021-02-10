import React from 'react';
import { Button, Form, Grid, Header, Image, Message, Segment,Card,Icon,GridColumn,GridRow,Input} from 'semantic-ui-react';
import {isBrowser} from 'react-device-detect';
import {loginAction} from '../actions/index';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {isLoggedIn} from '../util'
import { withRouter } from 'react-router';


class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            email: false,
            EmailId: ""
        }
    }
    handleUsernameChange = (e) => {
        this.setState({ username: e.target.value });
    }

    handlePasswordChange = (e) => {
        this.setState({ password: e.target.value });
    }

    authenticate = () => {
        this.props.login(this.state.username, this.state.password);
    }

    componentWillMount() {
        if (isLoggedIn(this.props.auth)) {
            this.props.history.push({
            pathname: `/home`,
            state: {details:this.props.auth}
            });
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (isLoggedIn(nextProps.auth)) {
            this.props.history.push({
                 pathname: `/home`,
                 state: {details:this.props.auth}
                });
            return false;
        }
        return true;
    }
    render() {
        
        if (isBrowser) return <Message negative floating>The Browser is not supported</Message>

        var loginBoxStyle = {
            borderRadius: 6,
            WebkitBoxShadow: '10px 11px 81px 3px rgba(191,191,191,1)',
            MozBoxShadow: '10px 11px 81px 3px rgba(191,191,191,1)',
            boxShadow: '10px 11px 81px 3px rgba(191,191,191,1)',
        }
       
        return (
            <Grid columns='equal' verticalAlign='middle' style={{ height: '100vh' }} centered>
            <GridRow>
                <Grid.Column></Grid.Column>
                <GridColumn width={10}>
                    <Segment raised style={loginBoxStyle}>
                        <Grid columns={2}>
                            <GridRow columns='equal'>
                                <GridColumn>
                               
                                </GridColumn>
                                <GridColumn verticalAlign="middle" style={{ paddingLeft: 50 }}>
                                    {/* {this.props.auth.loginError &&
                                        <Message warning>
                                            <Message.Header>Login Failed!</Message.Header>
                                            <p>Your email or password doesn't look right.</p>
                                        </Message>
                                    } */}
                                    <Input  fluid iconPosition='left' placeholder='Your Email Address'onChange={this.handleUsernameChange}>
                                        <Icon name='at' />
                                        <input />
                                    </Input><br /><br />
                                    <Input fluid iconPosition='left' type="password" placeholder='Password' onChange={this.handlePasswordChange}>
                                        <Icon name='lock' />
                                        <input />
                                    </Input><br /><br />
                                    <Button basic color='green' onClick={this.authenticate}>Login</Button>
                                    <br />
                                    <br />
                                </GridColumn>
                            </GridRow>
                        </Grid>
                    </Segment>
                </GridColumn>
                <GridColumn></GridColumn>
            </GridRow>
           
        </Grid>

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
        login: loginAction ,
}, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
