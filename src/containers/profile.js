import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/header';
import Sidebar from '../components/sidebar';
import { toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';

import firebase from 'firebase';
import { fetchProfile, createInvitation, updateUserInvitations } from '../actions/index';

class Profile extends Component {
    notify = () => toast("Your invitation was sent!");

    constructor(props) {
        super(props);
        // binding is necessary to make 'this' work on callback
        this.onInviteClick = this.onInviteClick.bind(this);
    }
    componentDidMount() {
        // get url ID
        if (!this.props.profile) {
            const { id } = this.props.match.params;
            this.props.fetchProfile(id);
        }
    }
    onInviteClick(event) {
        this.notify();
        const SENDER_PROFILE = this.props.active_user;
        const RECIPIENT = this.props.profile;

        // add this invitation to the international friend's invitation list
        this.props.updateUserInvitations(SENDER_PROFILE, RECIPIENT);
        this.props.createInvitation(SENDER_PROFILE , RECIPIENT.uid);
        this.props.history.push('/');
        
        /*
        this.props.deletePost(id, () => {
            this.props.history.push('/');
        });
        */
    }
    
    render() {
        const { profile } = this.props;

        return (
            <div>
                <div className="reconnect-wrapper">
                    <Sidebar user={this.props.active_user}/>
                    {
                        profile?
                        (
                        <div className="main_content_profile">
                            
                            <div className="header">
                                <img className="profile_picture" src={profile.prof_pic}/>
                                
                                <h1 className="name_header">{profile.name}</h1>
                                <button className="btn" onClick={this.onInviteClick}>Invite</button>
                            </div>

                            <div className="essay_wrapper">
                                <div className="essay_title">
                                    <h2>About me</h2>
                                </div>
                                <p className="essay_content">{profile.about_me}</p>
                            </div>

                            <div className="essay_wrapper">
                                <div className="essay_title">
                                    <h2>Integration</h2>
                                </div>
                                <p className="essay_content">{profile.integration}</p>
                            </div>
                            
                           <div className="essay_wrapper">
                                <div className="essay_title">
                                    <h2>Dreams</h2>
                                </div>
                                <p className="essay_content">{profile.dreams}</p>
                            </div>

                        </div>
                        ) : (
                        <div className="main_content_profile">
                            <p>Loading...</p>
                        </div>
                        )
                    }
                </div>
            </div>
        )
    }
}

// this.props === ownProps
function mapStateToProps({ suggestions,active_user }, ownProps) {
    // do intermediate calculations
    return {
        profile: suggestions[ownProps.match.params.id],
        active_user: active_user };
}
export default connect(mapStateToProps, { fetchProfile, createInvitation, updateUserInvitations })(Profile);