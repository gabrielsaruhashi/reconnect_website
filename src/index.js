import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import App from './components/app';

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
    <App />
  </Provider>
  , document.querySelector('.container'));
