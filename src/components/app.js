import React, { Component } from 'react';
import ReactDOM from 'react-dom'

import LoginForm from '../containers/login_form'
import EditProfile from '../containers/edit_profile';
import EditAboutMe from '../containers/edit_about_me';
import Profile from '../containers/profile';
import ConversationList from '../containers/conversation_list';
import SignupPage from '../containers/sign_up_page';
import ReConnect from '../containers/reconnect';
import DashboardHost from '../containers/dashboard_host';
import LandingPage from '../containers/landing_page'

import firebase from 'firebase';

import { BrowserRouter, Route } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { authenticate, setCurrentUser } from '../actions/index';
import Footer from '../components/footer';
import Header from '../components/header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from '../components/spinner';

class App extends Component {
  constructor() {
    super();
    this.state = {
      loading: true
    };
  }

  componentWillMount() {
    this.removeAuthListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.authenticate(true);
        // get user uid
        const uid = user.uid

        // update props
        firebase.database().ref('users/' + uid).on('value', snapshot => {
          this.props.setCurrentUser(snapshot.val())
          
          this.setState({
            loading: false
          })
        })
        
      } else {
        
        this.props.authenticate(false);
        this.setState({
          loading: false
        })
      }
    })
  }

  componentWillUnmount() {
    this.removeAuthListener();
  }

  notify_error = (message) => { toast.error(message, {
    position: toast.POSITION.BOTTOM_CENTER
    });
  };

  notify_success = (message) => { toast.success(message, {
      position: toast.POSITION.BOTTOM_CENTER
    });
  }

  render() {
    if (this.state.loading === true) {
      return (
        <div className="loading_wrapper">
          <h2>Loading</h2>
          <Spinner />
        </div>
      )
    }
    

    return (
      <BrowserRouter>
        <div>
          <Header />
          <Route exact path="/" component={ReConnect}/>
          <Route exact path="/dashboard_host" component={DashboardHost }/>
          <Route exact path="/login" component={LoginForm} />
          <Route exact path="/signup" component={SignupPage}/>
          <Route exact path="/edit_about_me" component={EditAboutMe}/>
          <Route exact path="/edit" component={EditProfile}/>
          <Route exact path="/usr/:id" component={Profile} />
          <Route exact path="/inbox" component={ConversationList}/>
          <Route exact path="/landing" component={LandingPage}/>
          <Footer/>
          <ToastContainer />

        </div>
      </BrowserRouter>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.authenticated,
    active_user: state.active_user,
  };
}

// dispatch to all
function mapDispatchToProps(dispatch) {
  return bindActionCreators( {authenticate: authenticate, setCurrentUser: setCurrentUser}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
