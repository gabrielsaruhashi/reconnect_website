import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import firebase from 'firebase';
import Suggestion from '../components/suggestion';
import { fetchSuggestions } from '../actions/index';
import Header from '../components/header'

class ReConnect extends Component {
    componentDidMount() {
        this.props.fetchSuggestions();
    }
    // Get a database reference to our posts
    renderSuggestions() {
        return _.map(this.props.suggestions, suggestion => {
            return (
                <li key={suggestion.uid}>
                    <Suggestion suggestion={suggestion}/>
                </li>
            );
        });
    }
    render() {
        return (
            <div>
                <Header/>
                <div className="reconnect-wrapper">
                    
                    <div className="sidebar">
                        
                        {this.props.active_user?
                            (
                                <div>
                                    <img className="profPic" src={this.props.active_user.prof_pic}/>
                                    <h2>{this.props.active_user.name}</h2>
                                </div>
                            ) : (
                                <div>
                                    <img className="profPic" src="https://static.licdn.com/scds/common/u/images/themes/katy/ghosts/person/ghost_person_200x200_v1.png"/>
                                    <h2>Loading profile...</h2>
                                </div>
                            )}
                    </div>
                    <div className="main_content">
                        <div className="header">
                            <h1>Invite</h1>
                            <p>Here is a list of reconnectors that we believe that match your profile and interests</p> 
                        </div>
                        <ul>
                            {this.renderSuggestions()}
                        </ul>
                    </div>
                </div>
            </div>
        ); 
    };
}

function mapStateToProps(state) {
    return {
        suggestions: state.suggestions,
        active_user: state.active_user,
        authenticated: state.authenticated
	};
}

// dispatch to all
function mapDispatchToProps(dispatch) {
    return bindActionCreators( {fetchSuggestions: fetchSuggestions}, dispatch);
    
}

export default connect(mapStateToProps, mapDispatchToProps)(ReConnect);