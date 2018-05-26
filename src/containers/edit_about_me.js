import React, {Component} from 'react';
import Header from '../components/header';
import { Redirect } from 'react-router-dom';
import firebase from 'firebase';

class EditAboutMe extends Component {
    constructor() {
        super();
        this.state = {
            redirect: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault()
        const usr = firebase.auth().currentUser
        const uid = usr.uid
        const newInfo = {
            "about_me": event.target.about_me.value,
            "dreams": event.target.dreams.value,
            "integration": event.target.integration.value
        };

        // update user entry
        firebase.database().ref('users/' + uid).update(newInfo);

        // redirect
        this.setState({redirect: true})
        
    }
    render () {
        if (this.state.redirect === true) {
            return <Redirect to={'/'} />
        }
        return (

            <div className="form_wrapper edit_about_me">
                    <img className="" src="../../public/logo.png"/>
                    <div className="form_container">
                        <div className="title_container">
                            <h1>Welcome to ReConnect!</h1>
                        </div>

                        <div className="row clearfix">
                            <div className="">
                                
                                <form className="form-profile-edit" onSubmit={this.handleSubmit}>
                                    <h2>Tell us about yourself!</h2>
                                    
                                    <textarea name="about_me" rows="10" cols="30" defaultValue={"I am..."}/>
                                    <br/>

                                    <h2>What is integration for you?</h2>
                                    <textarea name="integration" rows="10" cols="30" defaultValue={"Integration is..."}/>
                                    <br/>

                                    <h2>What are your dreams for the future? </h2>
                                    <textarea name="dreams" rows="10" cols="30" defaultValue={"I have a dream..."}/>
                                    <button className="btn btn-next">Next</button>
                                
                                </form>
                            </div>
                        </div>

                    </div>
                </div>

        )
    };
}

 // props to login_form
 function mapStateToProps(state) {
    return {
		active_user: state.active_user
	};
}


export default EditAboutMe;