import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import ChatRoom from './chatroom'
import GoogleMap from './google_map'
import Header from './header'

export default class Chat extends Component {
  
  render() {
    return (
      <div>
        <Header />
        <ChatRoom />
      </div>
    );
  }
}
