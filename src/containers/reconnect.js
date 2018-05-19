import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import firebase from 'firebase';
import Suggestion from '../components/suggestion';
import { fetchSuggestions } from '../actions/index'

class ReConnect extends Component {
    componentDidMount() {
        this.props.fetchSuggestions();
    }
    // Get a database reference to our posts
    renderSuggestions() {
        return _.map(this.props.suggestions, suggestion => {
            console.log(suggestion)
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
            
            <h3>ReConnections</h3>
            <ul>
                {this.renderSuggestions()}
            </ul>
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