import React, {Component} from 'react'
import firebase from 'firebase'
import { Redirect } from 'react-router-dom'
import { Alert } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setCurrentUser, authenticate } from '../actions/index';
import Header from '../components/header';
import Countries  from 'react-select-country';


const loginStyles = {
    width: "90%",
    maxWidth: "315px",
    margin: "20px auto",
    border: "1px solid #ddd",
    borderRadius: "5px",
    padding: "10px"
}


class LoginForm extends Component {
    constructor(props, context) {
        super(props)
        this.authWithEmailPassword = this.authWithEmailPassword.bind(this)
        this.onSelectCountry=this.onSelectCountry.bind(this);

        this.state = {
            redirect: false,
            new_user: false
        }
    }

    onSelectCountry(event){
        this.state.selectedCountry={
             id:event.target.value,
             name:event.target.options[event.target.selectedIndex].text
        }
        //OR,if you assign "ref" to the component , ,
        this.state.selectedCountry=this.refs.country.selected; // {value,name}
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
            this.toaster.show({ intent: Intent.WARNING, message: "Try alternative login." })
            } else {
            // sign user in
            return firebase.auth().signInWithEmailAndPassword(email, password)
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
                        "email": user.user.email
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
            //this.toaster.show({ intent: Intent.DANGER, message: error })
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
                                        <input type="radio" name="radiogroup1" id="rd1"/>
                                        <label>Male</label>
                                        <input type="radio" name="radiogroup1" id="rd2"/>
                                        <label>Female</label>
                                    </div>

                                    <div class="form-group">
                                        <label for="country">Country:</label>
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

/*
<Header />
                <div style={loginStyles}>
                    <button style={{width: "100%"}} className="pt-button pt-intent-primary" onClick={() => { this.authWithFacebook() }}>Log In with Facebook</button>
                    <hr style={{marginTop: "10px", marginBottom: "10px"}}/>
                    
                    <form onSubmit={(event) => { this.authWithEmailPassword(event) }} ref={(form) => { this.loginForm = form }}>
                        <div style ={{marginBottom:"10px"}}>
                            <h5>Note</h5>
                            If you don't have an account already, this form will create your account.
                        </div>

                        <label className="pt-label">
                            Email
                            <input style={{width: "100%"}} className="pt-input" name="email" type="email" ref={(input) => { this.emailInput = input }} placeholder="Email"></input>
                        </label>
                        <label className="pt-label">
                            Password
                            <input style={{width: "100%"}} className="pt-input" name="password" type="password" ref={(input) => { this.passwordInput = input }} placeholder="Password"></input>
                        </label>
                        <input style={{width: "100%"}} type="submit" className="pt-button pt-intent-primary" value="Log In"></input>
                    </form>
                </div>
*/
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

/*
function mapDispatchToProps(dispatch) {
    return bindActionCreators( {setCurrentUser: setCurrentUser, authenticate: authenticate}, dispatch); // selectBook is a function
    
} */

export default connect(mapStateToProps)(LoginForm);