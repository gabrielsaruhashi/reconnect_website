import React, {Component} from 'react'
import firebase from 'firebase'
import { Redirect } from 'react-router-dom'
import { Alert } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setCurrentUser } from '../actions/index';
import Header from '../components/header';
import Countries  from 'react-select-country';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


class LoginForm extends Component {
    notify = (message) => { toast.error(message, {
        position: toast.POSITION.BOTTOM_CENTER
        });
    };

    notify_success = (message) => { toast.success(message, {
        position: toast.POSITION.BOTTOM_CENTER
      });

    }

    constructor(props, context) {
        super(props)
        this.authWithEmailPassword = this.authWithEmailPassword.bind(this)

        this.state = {
            redirect: false
        }
    }

    authWithEmailPassword(event) {
        event.preventDefault()

        const email = this.emailInput.value
        const password = this.passwordInput.value
        firebase.auth().fetchSignInMethodsForEmail(email)
        .then((providers) => {
            if (providers.length === 0) {
                // notify
                this.loginForm.reset()

                this.notify_success("Invalid email address");
            }  else if (providers.indexOf("password") === -1) {
                // wrong password
                this.loginForm.reset()
                this.notify("Wrong password");
            } else {
                // sign user in
                return firebase.auth().signInWithEmailAndPassword(email, password)
            }
        })
        .then((user) => {
            if (user) {
                const uid = user.user.uid;
                // reset form
                this.loginForm.reset()

                // redirect to next route
                this.setState({redirect: true})
                this.notify_success(`Welcome back ${user.user.email}!`);
            }
        })
        .catch((error) => {
            console.log(error)
        })
    }
    render() {
        if (this.state.redirect === true && this.props.active_user) {
            return <Redirect to={'/'} />
        }

        return (
            <div>
                <div className="form_wrapper">
                    <img className="" src="../../public/logo.png"/>
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
        active_user: state.active_user
	};
}


export default connect(mapStateToProps)(LoginForm);
