import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import LoginForm from '../containers/login_form'
import EditProfile from '../containers/edit_profile';
import EditAboutMe from '../containers/edit_about_me';
import Chat from './chat'
import ReConnect from '../containers/reconnect';
import firebase from 'firebase';

import { BrowserRouter, Route } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { authenticate, setCurrentUser } from '../actions/index'

class App extends Component {
  
  
  componentWillMount() {

    this.removeAuthListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.authenticate(true);
        // get user uid
        const uid = user.uid
        // update props
        firebase.database().ref('users/' + uid).on('value', snapshot => {
          console.log("Active User Found!")
          this.props.setCurrentUser(snapshot.val())
          
        })
      } else {
        this.props.authenticate(false);
        this.props.setCurrentUser(null);
      }
    })
  }

  componentWillUnmount() {
    this.removeAuthListener();
  }
  render() {
    return (
      
      <BrowserRouter>
        <div>
          <Route exact path="/" component={ReConnect }/>
          <Route exact path="/login" component={LoginForm}/>
          <Route exact path="/edit_about_me" component={EditAboutMe}/>
          <Route exact path="/edit" component={EditProfile}/>
          
        </div>
      </BrowserRouter>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.authenticated,
    active_user: state.active_user
    
  };
}

// dispatch to all
function mapDispatchToProps(dispatch) {
  return bindActionCreators( {authenticate: authenticate, setCurrentUser: setCurrentUser}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
