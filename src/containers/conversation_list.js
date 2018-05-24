import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchConnections } from '../actions/action_connection';
import { selectConversation } from '../actions/action_conversation';
import _ from 'lodash';
import Chat from '../components/chat';

class ConversationList extends Component {
    componentWillMount() {
        this.props.fetchConnections(this.props.active_user.uid);
    }

    renderConversations() {
        const { connections } = this.props;
        var keys = Object.keys(connections);
        
        return _.map(keys, key => {
            const connection = connections[key];
            
            const class_name = (this.props.active_conversation == key)? "conversation-cell selected" : "conversation-cell";
            console.log(class_name)
            return (
                <li onClick={() => this.props.selectConversation(key)} key={key}>
                    <div className={class_name}>
                    <img src="https://cloud.netlifyusercontent.com/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/68dd54ca-60cf-4ef7-898b-26d7cbe48ec7/10-dithering-opt.jpg"/>
                    <div>
                        <p>{key}</p>
                        <p>Last message sent</p>
                    </div>
                    </div>
                </li>
            );
        })
    }
    render() {
        return (
            <div className="inbox-wrapper">
                <div className="sidebar-conversation-list">
                    <ul>
                        {this.renderConversations()}
                    </ul>
                </div>
                <div className="chat">
                    <Chat />
                </div>
            </div>
        )
    }
}

function mapStateToProps({connections, active_user, active_conversation }) {
    return {
        connections: connections,
        active_user: active_user
	};
}


export default connect(mapStateToProps, { fetchConnections, selectConversation })(ConversationList)
