import React, {Component} from 'react'
import firebase from 'firebase'
import { Field, reduxForm } from 'redux-form';

class LoginForm extends Component {
    constructor(props, context) {
        super(props)
    }
    render() {
        return(
            <div>
                <input
                    type="email"
                    placeholder="Email"/>
                <input
                    type="password"
                    placeholder="Password"/>
                <button className="btn btn-action">
                    Log in
                </button>

                <button className="btn btn-secondary">
                    Sign up
                </button>
                <button className="btn btn-secondary">
                    Log out
                </button>
            </div>
        )
    }

    login() {
        const auth = firebase.auth();
        auth.signInWithEmailAndPassword(email, password)
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