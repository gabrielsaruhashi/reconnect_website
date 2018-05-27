import React, {Component} from 'react'
import firebase from 'firebase'
import { Redirect } from 'react-router-dom'
import { Alert } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setCurrentUser, authenticate } from '../actions/index';
import Header from '../components/header';
import Countries  from 'react-select-country';



class SignupPage extends Component {
    constructor(props, context) {
        super(props)
        this.authWithEmailPassword = this.authWithEmailPassword.bind(this)
        this.onSelectCountry=this.onSelectCountry.bind(this);
        this.onSelectGender = this.onSelectGender.bind(this);
        this.state = {
            redirect: false,
            new_user: false,
            selected_country: "",
            gender: ""
        }
    }
    notify = (message) => { toast.error(message, {
        position: toast.POSITION.BOTTOM_CENTER
        });
    };

    onSelectCountry(event){
        this.setState({selected_country: this.refs.country.selected.name});
    }

    onSelectGender(event) {
        this.setState({gender: event.target.value});
    }

    authWithEmailPassword(event) {
        event.preventDefault()

        const email = this.emailInput.value
        const password = this.passwordInput.value
        firebase.auth().fetchSignInMethodsForEmail(email)
        .then((providers) => {
            if (providers.length === 0) {
            // create user
            return firebase.auth().createUserWithEmailAndPassword(email, password)
            } else if (providers.indexOf("password") === -1) {
            // they used facebook
            this.loginForm.reset()
            this.notify("There is already an existing account for this email address");
            } else {
            // sign user in
            this.notify("There is already an existing account for this email address");
            }
        })
        .then((user) => {
            if (user) {
                const uid = user.user.uid;
                // if new user create entry in firebase
                if (user.additionalUserInfo.isNewUser) {
                    
                    // compile info of new user
                    const newUser = {  
                        "uid": uid,
                        "email": user.user.email,
                        "country": this.state.selected_country,
                        "gender": this.state.gender
                    }

                    // create entry in firebase
                    firebase.database().ref('users/' + uid).set(newUser);

                    this.setState({new_user: true});
        
                }
                // reset form
                this.loginForm.reset()

                // redirect to next route
                this.setState({redirect: true})
            }
        })
        .catch((error) => {
            console.log(error)
        })
    }
    render() {
        if (this.state.redirect === true) {
            if (this.state.new_user) {
                return <Redirect to={'/edit'} />
            }
            else {
                return <Redirect to={'/'} />
            }
        }
        
        return (
            <div>
                <div className="form_wrapper">
                    <div className="form_container">
                        <div className="title_container">
                            <h2>Welcome to ReConnect!</h2>
                        </div>

                        <div className="row clearfix">
                            <div className="">
                                <form onSubmit={(event) => { this.authWithEmailPassword(event) }} ref={(form) => { this.loginForm = form }}>
                                    <div className="input_field"> <span><i aria-hidden="true" className="fa fa-lock"></i></span>
                                        <input type="email" name="email" placeholder="Email" ref={(input) => { this.emailInput = input }} required />
                                    </div>
                                    <div className="input_field"> <span><i aria-hidden="true" className="fa fa-lock"></i></span>
                                        <input type="password" name="password" placeholder="Password" ref={(input) => { this.passwordInput = input }} required />
                                    </div>
                                    <div className="input_field"> <span><i aria-hidden="true" className="fa fa-lock"></i></span>
                                        <input type="password" name="password" placeholder="Re-type Password" required />
                                    </div>
                                    

                                    <div className="input_field radio_option">
                                        <input type="radio" name="radiogroup1" id="rd1" value="male"  onChange={this.onSelectGender}/>
                                        <label>Male</label>
                                        <input type="radio" name="radiogroup1" id="rd2" value="female"  onChange={this.onSelectGender}/>
                                        <label>Female</label>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="country">Country:</label>
                                        <Countries ref="country" name="country" empty=" -- Select country --" onChange={(e)=>this.onSelectCountry(e)} />
                                    </div>

                                    <div className="input_field checkbox_option">
                                        <input type="checkbox" id="cb1"/>
                                        <label>I agree with terms and conditions</label>
                                    </div>
                                    <div className="input_field checkbox_option">
                                        <input type="checkbox" id="cb2"/>
                                        <label>I want to receive the newsletter</label>
                                    </div>
                                    <input className="button" type="submit" value="Submit" />
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
                
            </div>
        )
    }
}


function validate(values) {
    const errors = {};
  
    if (!values.email) {
      errors.title = 'Enter email';
    }
    if (!values.password) {
      errors.password = 'Enter password';
    }

    return errors;
}

// props to login_form
function mapStateToProps(state) {
    return {
        active_user: state.active_user,
        authenticated: state.authenticated
	};
}


export default connect(mapStateToProps)(SignupPage);