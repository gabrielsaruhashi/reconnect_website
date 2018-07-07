import React, { Component } from "react";
import ReactDOM from "react-dom";

import LoginForm from "../containers/login_form";
import EditProfile from "../containers/edit_profile";
import EditAboutMe from "../containers/edit_about_me";
import Profile from "../containers/profile";
import ConversationList from "../containers/conversation_list";
import SignupPage from "../containers/sign_up_page";
import ReConnect from "../containers/reconnect";
import DashboardHost from "../containers/dashboard_host";
import LandingPage from "../containers/landing_page";
import firebase from "firebase";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { authenticate, setCurrentUser } from "../actions/index";
import Footer from "../components/footer";
import Header from "../components/header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "../components/spinner";
function AuthenticatedRoute({ component: Component, authenticated, ...rest }) {
  // props.location is that where the person was trying to go;
  return (
    <Route
      {...rest}
      render={props =>
        authenticated === true ? (
          <Component {...props} {...rest} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      loading: true
    };
  }

  componentWillMount() {
    this.removeAuthListener = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.authenticate(true);
        const { uid } = user;
        // update props
        firebase
          .database()
          .ref("users/" + uid)
          .on("value", snapshot => {
            this.props.setCurrentUser(snapshot.val());
            this.setState({
              loading: false
            });
          });
      } else {
        this.props.setCurrentUser(null);
        this.props.authenticate(false);
        this.setState({
          loading: false
        });
      }
    });
  }

  componentWillUnmount() {
    this.removeAuthListener();
  }

  notify_error = message => {
    toast.error(message, {
      position: toast.POSITION.BOTTOM_CENTER
    });
  };

  notify_success = message => {
    toast.success(message, {
      position: toast.POSITION.BOTTOM_CENTER
    });
  };

  render() {
    if (this.state.loading === true) {
      return (
        <div className="loading_wrapper">
          <h2>Loading</h2>
          <Spinner />
        </div>
      );
    }

    return (
      <BrowserRouter>
        <div>
          <Header />
          <Route exact path="/landing" component={LandingPage} />
          <AuthenticatedRoute
            exact
            path="/dashboard_host"
            component={DashboardHost}
            authenticated={this.props.authenticated}
          />
          <Route exact path="/login" component={LoginForm} />
          <Route exact path="/signup" component={SignupPage} />
          <AuthenticatedRoute
            exact
            path="/edit_about_me"
            component={EditAboutMe}
            authenticated={this.props.authenticated}
          />
          <AuthenticatedRoute
            exact
            path="/edit"
            component={EditProfile}
            authenticated={this.props.authenticated}
          />
          <AuthenticatedRoute
            exact
            path="/usr/:id"
            component={Profile}
            authenticated={this.props.authenticated}
          />
          <AuthenticatedRoute
            exact
            path="/inbox"
            component={ConversationList}
            authenticated={this.props.authenticated}
          />
          <AuthenticatedRoute
            exact
            path="/"
            component={ReConnect}
            authenticated={this.props.authenticated}
          />
          <Footer />
          <ToastContainer />
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
  return bindActionCreators(
    { authenticate: authenticate, setCurrentUser: setCurrentUser },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
