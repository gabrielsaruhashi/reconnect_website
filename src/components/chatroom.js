import React, {Component} from 'react'
import firebase from 'firebase'
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchMessages, sendMessage } from '../actions/index'

class ChatRoom extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            message: ""
        }
    }
    
    componentDidMount() {
        // fetch messages from Firebase
        this.props.fetchMessages();
    }

    renderMessages() {
        if (this.props.messages != null) {
            return this.props.messages.map((message) => { 
                return (
                    <li  
                        key={message.id} 
                        className="list-group-item">{message.text}
                    </li>
                    )
            });      
        }
          
    }
    render() {
        return (
            <div>
                This is the ChatRoom!
                <ol className="list-group col-sm-4">
                    {this.renderMessages()}
                </ol>
                <input 
                    type="text" 
                    placeholder="message"
                    onChange={(event) => this.onInputChange(event.target.value)}/>
                <br />
                <button
                    className="btn-danger"
                    onClick = {(event) => this.sendMessage(event)}>Send</button>
            </div>
        )
    }

    sendMessage(event) {
        const message = {id: this.props.messages.length + 1, text: this.state.message};
        this.props.sendMessage(message);
        //firebase.database().ref('messages/' + message.id).set(message);
    }
    // define event handler to handle events - first step
	onInputChange(message) {
        this.setState({message});
	}
}
function mapStateToProps(state) {
	return {
        active_user: state.active_user,
        messages: state.messages
	};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators( {fetchMessages: fetchMessages, sendMessage: sendMessage}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoom);