import React, { Component } from 'react';
import { createMessage, fetchMessages, updateLastMessageSent } from '../actions/action_conversation';
import moment from 'moment';
import Moment from 'react-moment';
import { connect } from 'react-redux';


const Message = ({ message, sender, isMe }) => {
    const current_time = moment().format();
    const display_name = isMe ? "Me" : sender.name;
    const profile_pic = sender.prof_pic;
    const message_class = isMe? "message my-message" : "message other-message"
    const message_data_class = isMe? "message-data align-right" : "message-data align-left";
    return (
        <div className="message_wrapper">
            <div className={message_data_class}>
                <span className="message-data-time" ><Moment fromNow>{message.creation_date}</Moment></span> &nbsp; &nbsp;
                <span className="message-data-name" >{display_name}</span>
            </div>
            <div className={message_class}>
                <p>{message.message}</p>
            </div>
        </div>
    )
   
}

class Chat extends Component {
    componentDidUpdate(prevProps, prevState, snapshot) {
        const { active_conversation } = this.props;
        // only fetch messages when there is a new active conversation
        if (active_conversation && 
                !_.isEqual(active_conversation, prevProps)) {
            
            const { connection_id } = active_conversation;

            // fetch messages if this chat's messages have not been loaded yet
            // OR if messages state object does not exist yet
            if (!this.props.messages ||
                !this.props.messages[connection_id]) {
                    this.props.fetchMessages(connection_id);
            }
        }
        // scroll to latest message added
        var el = this.refs.wrap;
        el.scrollTop = el.scrollHeight;
            
    }
    constructor() {
        super();
        this.state = {
            message: ""
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
        const { connection_id } = this.props.active_conversation;
        this.props.createMessage(connection_id, message);
        
        // update connection with the latest message
        this.props.updateLastMessageSent(connection_id, message);

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
        const { active_conversation } = this.props;
        const chat_messages = this.props.messages[active_conversation.connection_id];
        const { active_user } = this.props;
        // message is the key of the object that contains the list of messages
        return _.map(chat_messages, message => { 
            counter += 1;

            const sender_info = (message.sender == active_user.uid) ? active_user : active_conversation.person;
            const isMe = (message.sender == active_user.uid) ? true : false;
            return (
                <li key={counter}>
                    <Message message={message} sender={sender_info} isMe={isMe} />
                </li>
            );
        });
    }
    render() {

        if (!this.props.active_conversation) {
            return (
                <div className="no-selection-message">
                    <h1>No conversations selected.</h1>
                    <h2>Try selecting a conversation.</h2>
                </div>
            )
        }

        const { person } = this.props.active_conversation;

        return (
            <div>
                <div className="chat-header">
                    <div className="circled-profPic medium-pic" style={{backgroundImage: 'url(' + person.prof_pic + ')'}}/>
                    
                    <div className="chat-with">Chat with {person.name}</div>
            
                </div>
                
                <div className="chat-history" ref="wrap">
                    <ul>
                        {this.renderMessages()}
                    </ul>
                    
                </div>
            
                <div>
                    <form className="chat-message" onSubmit={this.handleSubmit} ref="form">
                        <textarea  name="message-to-send" onChange={this.handleChange} value={this.state.message} placeholder="Type your message..." rows="3"></textarea>
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

export default connect(mapStateToProps, { createMessage, fetchMessages, updateLastMessageSent })(Chat);