import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import App from './components/app';
import reducers from './reducers';
import firebase from 'firebase';

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

    <App />
  </Provider>
  , document.querySelector('.container'));
