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
    constructor() {
        super();
        this.renderSuggestions = this.renderSuggestions.bind(this);
        this.compareSimilarity = this.compareSimilarity.bind(this);
    }
    // Get a database reference to our posts
    renderSuggestions() {
        // only show suggestions that have not been invited yet
        const { active_user } = this.props;
        var valid_suggestions = {}
        if (this.props.invitations) {
            valid_suggestions = _.filter(this.props.suggestions, 
                suggestion => {
                    
                    return (!(suggestion.uid in active_user.invitations) &&
                            (suggestion.uid != active_user.uid))
                })
        }
        else {
            valid_suggestions = _.omit(this.props.suggestions, active_user.uid );
        }

        // sort valid suggestions by similarity
        var items = Object.keys(valid_suggestions).map(function(key) {
            return [key, valid_suggestions[key]];
        });
        // Sort the array based on the user's info
        console.log(items);
        items.sort(this.compareSimilarity);
        console.log(items);

        return _.map(valid_suggestions, suggestion => {
            return (
                <li key={suggestion.uid}>
                    <Suggestion suggestion={suggestion} />
                </li>
            );
        });
    }

    sim(user, suggestion) {
        var sim_score = 0;
       
        for (var interest in user.interests) {

            if ( interest in suggestion.interests) {
                sim_score += 1;
            }
        }
        return sim_score;
    }

    compareSimilarity(p1, p2) {
        const { active_user } = this.props;

        var sim1 = this.sim(active_user, p1[1]);
        var sim2 = this.sim(active_user, p2[1]);
        
        return sim2 - sim1;
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
