import React, { Component } from 'react';
import moment from 'moment'; 
import { createConnection, updateUserConnections, deleteInvitation } from '../actions/action_connection'
import { toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import { Redirect, Link } from 'react-router-dom';
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
        var members = {};
        members[host.uid] = true;
        members[incoming.uid] = true;

        const connection = {
            'members': members,
            'creation_date': creation_date   
        }
        // create connection and delete invitation from host's
        const newConnection = this.props.createConnection(connection);        
        this.props.updateUserConnections(host, newConnection.key, incoming);
        this.props.updateUserConnections(incoming, newConnection.key, host);
        // invitation is always from an international student to a host
        this.props.deleteInvitation(host, incoming);
        return <Redirect to="/"/>
        
    }

    
    render() {
        const { student } = this.props;
        const REDIRECT_URL = `usr/${student.uid}`;
        return (
            <Link to={REDIRECT_URL}>
                <div className="invitation_wrapper">
                    <img src={student.prof_pic} />
                    <h2>{student.name}</h2>
                    <div className="invitation_wrapper__btn-actions">
                        <button className="btn-reject">Ignore</button>
                        <button className="btn" onClick={this.onAccept}><i className="fa fa-check-circle-o fa-2x"></i>Accept</button>
                    </div>
                   
                </div>
            </Link>
        );
    }
}

export default connect(null, {createConnection, updateUserConnections, deleteInvitation})(Invitation);