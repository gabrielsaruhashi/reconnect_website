import React, { Component } from "react";
import Header from "../components/header";
import { Redirect } from "react-router-dom";
import firebase from "firebase";
import { connect } from "react-redux";

class EditAboutMe extends Component {
  constructor() {
    super();
    this.state = {
      redirect: false,
      integration: "",
      dreams: "",
      about_me: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  filterVal(val) {
    return val ? val : "";
  }

  componentDidMount() {
    const { active_user } = this.props;
    const { integration, about_me, dreams } = active_user;
    this.setState({
      about_me: this.filterVal(about_me),
      integration: this.filterVal(integration),
      dreams: this.filterVal(dreams)
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const usr = firebase.auth().currentUser;
    const { uid } = usr;
    const info = {
      about_me: this.state.about_me,
      dreams: this.state.dreams,
      integration: this.state.integration
    };
    // update user entry
    firebase
      .database()
      .ref("users/" + uid)
      .update(info);
    // redirect
    this.setState({ redirect: true });
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  render() {
    if (this.state.redirect === true) {
      return <Redirect to={"/"} />;
    }
    return (
      <div className="form_wrapper edit_about_me">
        <img className="" src="../../public/logo.png" />
        <div className="form_container">
          <div className="title_container">
            <h1>Welcome to ReConnect!</h1>
          </div>

          <div className="row clearfix">
            <div>
              <form className="form-profile-edit" onSubmit={this.handleSubmit}>
                <h2>Tell us about yourself!</h2>

                <textarea
                  name="about_me"
                  rows="10"
                  cols="30"
                  onChange={this.handleChange("about_me")}
                  value={this.state.about_me}
                />
                <br />

                <h2>What is integration for you?</h2>
                <textarea
                  name="integration"
                  rows="10"
                  cols="30"
                  onChange={this.handleChange("integration")}
                  value={this.state.integration}
                />
                <br />

                <h2>What are your dreams for the future?</h2>
                <textarea
                  name="dreams"
                  rows="10"
                  cols="30"
                  onChange={this.handleChange("dreams")}
                  value={this.state.dreams}
                />
                <button className="btn btn-next">Next</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// props to login_form
function mapStateToProps(state) {
  return {
    active_user: state.active_user
  };
}

export default connect(mapStateToProps)(EditAboutMe);
