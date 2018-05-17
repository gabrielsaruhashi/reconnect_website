import React, {Component} from 'react'
import firebase from 'firebase'
import { Redirect } from 'react-router-dom'

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
    }

    authWithFacebook() {
        console.log("authed with facebook")
    }

    authWithEmailPassword(event) {
        const email = this.emailInput.value
        const password = this.passwordInput.value
    }
    render() {
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

    login() {
        //const auth = firebase.auth();
        //auth.signInWithEmailAndPassword(email, password)
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

  /*
export default reduxForm({
    form: 'LoginForm',
    fields: ['email', 'password', 'content'],
    validate
  }, null, { createPost })(LoginForm); */
  export default LoginForm