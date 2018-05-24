import React, { Component } from 'react';
import { createMessage, fetchMessages } from '../actions/action_conversation';
import moment from 'moment';
import { connect } from 'react-redux';


const Message = ({ message }) => {
    return (
        <div>
            <div className="message-data">
                <span className="message-data-time" >{message.creation_date}</span> &nbsp; &nbsp;
                <span className="message-data-name" >{message.sender}</span>
            </div>
            <div className="message other-message">
            {message.message}
            </div>
        </div>
    )
   
}

class Chat extends Component {
    componentDidUpdate(prevProps, prevState, snapshot) {
       
        if (this.props.active_conversation && 
                this.props.active_conversation != prevProps.active_conversation ) {
            
            if (!this.props.messages ||
                !this.props.messages[this.props.active_conversation]) {
                    this.props.fetchMessages(this.props.active_conversation);
            }
        }
            
    }
    constructor() {
        super();
        this.state = {
            message: "Type your message..."
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.renderMessages = this.renderMessages.bind(this);
    }

    
    handleSubmit(event) {

        event.preventDefault();
        // build message object using info
        const creation_date = moment().format();
        const message = {
            creation_date: creation_date,
            message: this.state.message,
            sender: this.props.active_user.uid
        }
        // create message
        this.props.createMessage(this.props.active_conversation, message);
        // reset field
        this.setState({
            message: ''
        });
    }

    handleChange(event) {
        this.setState({
            message: event.target.value
        })
    }

    renderMessages() {
        var counter = 0;
        const chat_messages = this.props.messages[this.props.active_conversation];
        
        // message is the key of the object that contains the list of messages
        return _.map(chat_messages, message => { 
            counter += 1;
            return (
                <li key={counter}>
                    <Message message={message}/>
                </li>
            );
        });
    }
    render() {
        if (!this.props.active_conversation) {
            return (
                <div>
                    No conversations selected.
                    Try selecting a conversation.
                </div>
            )
        }

        return (
            <div>
                <div className="chat-header">
                    <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01_green.jpg" alt="avatar" />
                    <div className="chat-with">Chat with Vincent Porter</div>
            
                </div>
                
                <div className="chat-history">
                    <ul>
                        {this.renderMessages()}
                    </ul>
                    
                </div>
            
                <div className="chat-message">
                    <form onSubmit={this.handleSubmit} ref="form">
                        <textarea  name="message-to-send" onChange={this.handleChange} value={this.state.message} rows="3"></textarea>
                        <button className="btn">Send</button>
                    </form>
                </div>
        
            </div>
        );
    }
}


// props to login_form
function mapStateToProps({active_conversation, messages, active_user}) {
    return {
        messages: messages,
        active_conversation: active_conversation,
        active_user: active_user
	};
}

export default connect(mapStateToProps, { createMessage, fetchMessages })(Chat);