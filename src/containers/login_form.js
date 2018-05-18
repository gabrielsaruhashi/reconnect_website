import React, {Component} from 'react'
import firebase from 'firebase'
import { Redirect } from 'react-router-dom'
import { Alert } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setCurrentUser } from '../actions/index'

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
        this.authWithFacebook = this.authWithFacebook.bind(this)
        this.authWithEmailPassword = this.authWithEmailPassword.bind(this)
        this.state = {
            redirect: false,
            new_user: false
          }
      
    }

    authWithFacebook() {
        const auth = firebase.auth()
        const facebookProvider = new firebase.auth.FacebookAuthProvider()
        
        // sign in with facebook
        auth.signInWithPopup(facebookProvider)
        .then((user, error) => {
          if (error) {
              
            this.toaster.show({ intent: Intent.DANGER, message: "Unable to sign in with Facebook" })
          } else {
            this.props.setCurrentUser(user)
            if (user.additionalUserInfo.isNewUser) {
                this.setState({new_user:true});
            }
            this.setState({ redirect: true })
          }
        })
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
                // if new user create entry in firebase
                if (user.additionalUserInfo.isNewUser) {
                    const uid = user.user.uid;
                    const newUser = {  
                        "uid": uid,
                        "name": user.user.displayName,
                        "email": user.user.email
                    }
                    // create entry in firebase
                    firebase.database().ref('users/' + uid).set(newUser);
                    this.setState({new_user: true});
        
                }
                this.loginForm.reset()
                this.props.setCurrentUser(user)

                // create user
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
		active_user: state.active_user
	};
}

// dispatch to all
function mapDispatchToProps(dispatch) {
    return bindActionCreators( {setCurrentUser: setCurrentUser}, dispatch); // selectBook is a function
    
}

  export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);