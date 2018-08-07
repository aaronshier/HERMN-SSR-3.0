import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { ActionCreators } from '../actions/index'

class Login extends Component<{}> {
    componentDidMount(){
        
    }
    render() {
        return (
             <div>
                 <h1>Dank Sauce, Login</h1>
                 <p onClick={ this.props.history.goBack } >
                    > Back
                 </p>
             </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        state
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)