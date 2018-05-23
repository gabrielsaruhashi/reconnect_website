import React, { Component } from 'react';


const Message = props => {
    return (
        <li>
            <div className="message-data">
            <span className="message-data-time" >10:10 AM, Today</span> &nbsp; &nbsp;
            <span className="message-data-name" >Olia</span> <i className="fa fa-circle me"></i>
            
            </div>
            <div className="message other-message">
            Hi Vincent, how are you? How is the project coming along?
            </div>
        </li>
    )
}
const Chat = props => {
    return (
        <div className="chat">
            <div className="chat-header clearfix">
                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01_green.jpg" alt="avatar" />
                
                
                <div className="chat-with">Chat with Vincent Porter</div>
        
            </div>
            
            <div className="chat-history">
                <ul>
                    <Message />
                </ul>
                
            </div>
        
            <div className="chat-message">
                <textarea name="message-to-send" id="message-to-send" placeholder ="Type your message" rows="3"></textarea>
                <button className="btn">Send</button>
            </div>
    
        </div>
    );
}

export default Chat;
