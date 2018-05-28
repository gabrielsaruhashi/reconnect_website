import React, { Component } from 'react';
import moment from 'moment'; 
import { createConnection, updateUserConnections, deleteInvitation } from '../actions/action_connection'
import { toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';


class Invitation extends Component {

    constructor(props) {
        super(props);
        
        this.onAccept = this.onAccept.bind(this);
        this.onReject = this.onReject.bind(this);
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

        //this.sendEmail();
        return <Redirect to="/"/>
    }

    onReject(event) {
        const host = this.props.host_friend;
        const incoming = this.props.student; 
        // invitation is always from an international student to a host
        this.props.deleteInvitation(host, incoming);
    }

    sendEmail() {
        const BASE_URL = 'https://api.mailgun.net/v3';
        const DOMAIN = 'sandbox8d14ebfc431f4c31b7d2c764af5262b8.mailgun.org'

        axios({
            method: 'post',
            url: `${BASE_URL}/${DOMAIN}/messages`,
            auth: {
                username: 'api',
                password: 'b0b4412e4e8317df7c3d6a75f601f3f9-115fe3a6-044c0528'
            },
            params: {
                from: 'Awesome Development Team <noreply@yourdomain.com>',
                to: 'testing@example.com',
                subject: 'Hello',
                text: 'Welcome to the team!'
            }
        }).then(
            response => {
                console.log(response)
            },
            reject => {
                console.log(reject)
            }
        )
    }
    render() {
        const { student } = this.props;
        const REDIRECT_URL = `usr/${student.uid}`;
        return (
            
                <div className="invitation_wrapper">
                    <Link to={REDIRECT_URL}>
                        <div className="invitation_wrapper__info">
                            <img src={student.prof_pic} />
                            <div className="user_info">
                                <h2>{student.name}</h2>
                                <h3>{student.school}</h3>
                            </div>
                        </div>
                    </Link>
                    <div className="invitation_wrapper__btn-actions">
                        <button className="btn-reject" onClick={this.onReject}>Ignore</button>
                        <button className="btn" onClick={this.onAccept}><i className="fa fa-check-circle-o fa-2x"></i>Accept</button>
                    </div>
                   
                </div>
            
        );
    }
}

export default connect(null, {createConnection, updateUserConnections, deleteInvitation})(Invitation);