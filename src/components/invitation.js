import React, { Component } from 'react';
import moment from 'moment'; 
import { createConnection, updateUserConnections, deleteInvitation } from '../actions/action_connection'
import { toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class Invitation extends Component {

    constructor(props) {
        super(props);
        this.onAccept = this.onAccept.bind(this);
    }

    notify = () => toast("You have a new connection!");
    dismissAll = () =>  toast.dismiss();
    onAccept(event) {
        this.notify();
        const creation_date = moment().format();
        
        const host = this.props.host_friend;
        const incoming = this.props.student; 

        // create dictionary of members
        const members = {};
        members[host.name] = true;
        members[incoming.name] = true;

        const connection = {
            'members': members,
            'creation_date': creation_date   
        }
        // create connection and delete invitation from host's
        const newConnection = this.props.createConnection(connection, host, incoming);        
        this.props.updateUserConnections(host, newConnection.key);
        this.props.updateUserConnections(incoming, newConnection.key);
        this.props.deleteInvitation(host, incoming);
        return <Redirect to="/"/>
        
    }

    render() {
        const { student } = this.props;
        return (
            <div className="invitation_wrapper">
                <img src={student.prof_pic} />
                <h2>{student.name}</h2>
                <div>
                    <button className="btn" onClick={this.onAccept}><i className="fa fa-check-circle-o fa-2x"></i></button>
                </div>
                <button className="btn"><i className="fa fa-close fa-2x"></i></button>
            </div>
        );
    }
}

export default connect(null, {createConnection, updateUserConnections, deleteInvitation})(Invitation);