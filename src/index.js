import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import App from './components/app';
import LoginForm from './containers/login_form'
import EditProfile from './containers/edit_profile';
import EditAboutMe from './containers/edit_about_me'

import reducers from './reducers';
import firebase from 'firebase';
import { BrowserRouter, Route } from 'react-router-dom';
import reduxThunk from 'redux-thunk';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);

// Initialize Firebase

var config = {
  apiKey: "AIzaSyBikhUuxvdby-jvrW45ozvAMHbjN7W8_EQ",
  authDomain: "project-reconnect.firebaseapp.com",
  databaseURL: "https://project-reconnect.firebaseio.com",
  projectId: "project-reconnect",
  storageBucket: "project-reconnect.appspot.com",
  messagingSenderId: "412974593069"
};
firebase.initializeApp(config); 

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>

    <BrowserRouter>
      <div>
        <Route exact path="/" component={App}/>
        <Route exact path="/login" component={LoginForm}/>
        <Route exact path="/edit_about_me" component={EditAboutMe}/>
        <Route exact path="/edit" component={EditProfile}/>
        
      </div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));
