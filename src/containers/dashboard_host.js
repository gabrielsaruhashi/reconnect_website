import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import firebase from 'firebase';
import Suggestion from '../components/suggestion';
import { fetchInvitations } from '../actions/index';
import Header from '../components/header';
import Sidebar from '../components/sidebar';
import Invitation from '../components/invitation';
import moment from 'moment';


class DashboardHost extends Component {
    

    constructor(props) {
        super(props);
        this.renderInvitations = this.renderInvitations.bind(this);
        this.invitations = {};
    }
    componentDidMount() {
        this.props.fetchInvitations();
    }
    renderInvitations() {
        return _.map(this.invitations, student => {
            return (
                <li key={student.uid}>
                    <Invitation student={student} host_friend={this.props.active_user}/>
                </li>
            );
        });
    }

    render() {
        // get invitations and their length
        // TODO fix this
        this.invitations = this.props.active_user && this.props.invitations ? this.props.invitations[this.props.active_user.uid] : {};        

        const len_invitations = this.invitations? Object.keys(this.invitations).length : 0;

        return (
            <div className="reconnect-wrapper">
                <Sidebar user={this.props.active_user} />

                <div className="main_content_profile">
                    <h2>Invitations ( {len_invitations} )</h2>
                    <ul>
                        {this.renderInvitations()}
                    </ul>
                </div>
            </div>
        );
    }
}

function mapStateToProps({ active_user, invitations }) {
    return { active_user: active_user, invitations: invitations };
}
export default connect(mapStateToProps, {fetchInvitations})(DashboardHost)