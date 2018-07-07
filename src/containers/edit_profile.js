import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Header from "../components/header";
import Checkbox from "../components/checkbox";
import { Redirect } from "react-router-dom";
import firebase from "firebase";
import FontAwesome from "react-fontawesome";
import MultipleSelect from "../components/mutiple_select";
import SingleSelect from "../components/single_select";
import TextField from "@material-ui/core/TextField";

const INTERESTS = [
  "Sports",
  "Soccer",
  "Photography",
  "Coffee",
  "Travel",
  "Games",
  "Music",
  "Outdoors",
  "Food",
  "Nightlife"
];

const SCHOOLS = [
  "De La Salle University- Manila",
  "De La Salle- College of Saint Benilde",
  "Ateneo de Manila University",
  "University of the Philippines",
  "Universitas Indonesia",
  "Chulalongkorn University",
  "Mahidol University"
];

const DEFAULT_PICTURE =
  "https://www.ischool.berkeley.edu/sites/default/files/default_images/avatar.jpeg";

class EditProfile extends Component {
  constructor() {
    super();
    this.state = {
      redirect: false,
      school: "",
      name: "",
      interests: [],
      selected_picture: "",
      age: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  filterVal(val) {
    return val ? val : "";
  }

  filterContainer(container) {
    return container ? container : {};
  }

  componentWillMount() {
    const { active_user } = this.props;
    const { name, age, school, prof_pic, interests } = active_user;
    this.setState({
      name: this.filterVal(name),
      school: this.filterVal(school),
      age: this.filterVal(age),
      selected_picture: this.filterVal(prof_pic),
      interests: this.filterContainer(interests)
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const usr = firebase.auth().currentUser;
    const uid = usr.uid;
    const storage = firebase.storage();
    // convert array of intesrests to object
    var interests = this.state.interests ? this.state.interests : [];
    var interests_dict = {};
    for (let i = 0; i < interests.length; i++) {
      interests_dict[interests[i]] = true;
    }
    // if user uploaded picture, store it in our server
    const file = event.target.image.files[0];

    if (file) {
      const path = uid + "/profilePicture/" + file.name;
      var task = storage
        .ref(path)
        .put(file)
        .then(() => {
          // get URL reference to stored picture
          const picRef = storage.ref(path);
          picRef.getDownloadURL().then(url => {
            // update user entry in firebase
            const newInfo = {
              interests: interests_dict,
              prof_pic: url,
              name: this.state.name,
              school: this.state.school,
              age: this.state.age
            };
            // store
            firebase
              .database()
              .ref("users/" + uid)
              .update(newInfo);
          });
        });
    } else {
      // no picture, but we still want to store  the info
      const newInfo = {
        interests: interests_dict,
        name: this.state.name,
        school: this.state.school,
        age: this.state.age
      };
      firebase
        .database()
        .ref("users/" + uid)
        .update(newInfo);
    }

    // redirect to next page
    this.setState({ redirect: true });
  }

  handlePictureChange(event) {
    const file = event.target.files[0];
    var reader = new FileReader();
    var url = reader.readAsDataURL(file);

    reader.onloadend = function(e) {
      this.setState({
        selected_picture: [reader.result]
      });
    }.bind(this);
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  render() {
    if (this.state.redirect === true) {
      return <Redirect to={"/edit_about_me"} />;
    }
    const { age } = this.state;
    const selected_picture = this.state.selected_picture
      ? this.state.selected_picture
      : DEFAULT_PICTURE;

    return (
      <div>
        <div className="form_wrapper">
          <img className="" src="../../public/logo.png" />
          <div className="form_container">
            <div className="row clearfix">
              <div className="">
                <form
                  className="form-profile-edit"
                  onSubmit={this.handleSubmit}
                >
                  <div className="input_field">
                    {" "}
                    <span>
                      <i aria-hidden="true" className="fa fa-lock" />
                    </span>
                    <input
                      type="text"
                      name="first_name"
                      value={this.state.name}
                      placeholder="Name"
                      onChange={this.handleChange("name")}
                      required
                    />
                  </div>

                  <div className="input_field">
                    {" "}
                    <span>
                      <i aria-hidden="true" className="fa fa-lock" />
                    </span>
                    <input
                      type="text"
                      name="age"
                      value={this.state.age}
                      placeholder="Age"
                      onChange={this.handleChange("age")}
                      required
                    />
                  </div>
                  <SingleSelect
                    OnSelectEvent={school => this.setState({ school })}
                    fields={SCHOOLS}
                  />
                  <h2>Interests</h2>
                  <MultipleSelect
                    OnSelectEvent={interests => this.setState({ interests })}
                    fields={INTERESTS}
                    currentSelections={this.state.interests}
                  />

                  <h2>Select your picture</h2>
                  <div
                    className="circled-profPic select-pic"
                    style={{ backgroundImage: "url(" + selected_picture + ")" }}
                  >
                    <input
                      name="image"
                      type="file"
                      accept="image/*"
                      onChange={e => this.handlePictureChange(e)}
                      capture
                    />
                  </div>
                  <input className="button" type="submit" value="Submit" />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ active_user }) {
  return { active_user: active_user };
}

export default connect(mapStateToProps)(EditProfile);
