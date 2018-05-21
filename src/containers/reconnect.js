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
                        <div>
                            <img className="profPic" src="https://image.freepik.com/free-photo/cute-cat-picture_1122-449.jpg"/>
                            <h2>Gabriel Saruhashi</h2>
                        </div>
                        
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
        authenticated: state.authenticated
	};
}

// dispatch to all
function mapDispatchToProps(dispatch) {
    return bindActionCreators( {fetchSuggestions: fetchSuggestions}, dispatch);
    
}

export default connect(mapStateToProps, mapDispatchToProps)(ReConnect);