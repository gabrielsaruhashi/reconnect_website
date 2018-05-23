import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import firebase from 'firebase';
import Suggestion from '../components/suggestion';
import { fetchSuggestions } from '../actions/index';
import Header from '../components/header';
import Sidebar from '../components/sidebar';
import { withRouter } from 'react-router-dom';

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
                <div className="reconnect-wrapper">
                    
                    <Sidebar user={this.props.active_user}/>
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

function mapDispatchToProps(dispatch) {
    return bindActionCreators( {fetchSuggestions: fetchSuggestions}, dispatch);
    
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ReConnect));
