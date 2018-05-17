import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import App from './components/app';
import LoginForm from './containers/login_form'
import reducers from './reducers';
import firebase from 'firebase';
import { BrowserRouter, Route } from 'react-router-dom';

const createStoreWithMiddleware = applyMiddleware()(createStore);

// Initialize Firebase
var config = {
  apiKey: "AIzaSyBikhUuxvdby-jvrW45ozvAMHbjN7W8_EQ",
  authDomain: "project-reconnect.firebaseapp.com",
  databaseURL: "https://project-reconnect.firebaseio.com",
  projectId: "project-reconnect",
  storageBucket: "",
  messagingSenderId: "412974593069"
};
firebase.initializeApp(config);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>

    <BrowserRouter>
      <div>
        <Route exact path="/" component={App}/>
        <Route exact path="/login" component={LoginForm}/>
      </div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));
