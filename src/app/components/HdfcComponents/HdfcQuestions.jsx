import React, { Component } from 'react'
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router";
export class HdfcQuestions extends Component {
  constructor(props){
    super(props);
    this.state = {
      questionsView : true
    }
  }
    componentDidMount() {
        this.props.fetchHdfcTemplates();
      }
    render() {
        return (
            <div style={{height:"750px"}}>
                <h1>Questions</h1>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
      hdfc: state.hdfc
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return bindActionCreators({ }, dispatch);
  };
  
  export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HdfcQuestions));
