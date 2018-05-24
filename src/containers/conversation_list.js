import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchConnections } from '../actions/action_connection';
import { selectConversation, fetchConnectionsInfo } from '../actions/action_conversation';
import _ from 'lodash';
import Chat from '../components/chat';

class ConversationList extends Component {
    componentWillMount() {
        this.props.fetchConnections(this.props.active_user.uid);
        this.props.fetchConnectionsInfo(this.props.active_user.uid);
    }

    renderConversations() {
        const { connections } = this.props;
        var keys = Object.keys(connections);
        
        return _.map(keys, key => {
            
            const connection = connections[key];

            // get other member's id
            const members = Object.keys(connection.members);
            //var other_id = -1;
            var other_id = this.props.active_user.uid;
            for (let i = 0; i < members.length; i ++) {
                if (members[i] != this.props.active_user.uid) {

                    other_id = members[i];
                }
            }
            
            // get other's info
            const other_info = this.props.connections_info[other_id];

            const class_name = (this.props.active_conversation && 
                this.props.active_conversation.connection_id == key)? "conversation-cell selected" : "conversation-cell";
            
            if (other_info) {
                return (
                    <li onClick={() => this.props.selectConversation(key, other_info)} key={key}>
                        <div className={class_name}>
                            <img src={other_info.prof_pic}/>
                            <div>
                                <p>{other_info.name}</p>
                                <p>Last message sent</p>
                            </div>
                        </div>
                    </li>
                );
            }
            else {
                return (
                    <li key={key}>
                        <div className={class_name}>
                            <img src="https://cloud.netlifyusercontent.com/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/68dd54ca-60cf-4ef7-898b-26d7cbe48ec7/10-dithering-opt.jpg"/>
                            <div>
                                <p>Loading...</p>
                                <p>Loading...</p>
                            </div>
                        </div>
                    </li>
                );
            }
            
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

function mapStateToProps(state) {
    return {
        connections: state.connections,
        active_user: state.active_user,
        active_conversation: state.active_conversation,
        connections_info: state.connections_info
	};
}


export default connect(mapStateToProps, { fetchConnections, selectConversation, fetchConnectionsInfo })(ConversationList)
