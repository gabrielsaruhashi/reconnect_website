import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Jumbotron, Button, Form, FormGroup, ProgressBar } from 'react-bootstrap';  
import Header from '../components/header';
import Checkbox from '../components/checkbox';
import { Redirect } from 'react-router-dom';
import firebase from 'firebase';
import FontAwesome from 'react-fontawesome';

const BUCKET = "project-reconnect.appspot.com/"
const items = [
    "Sports",
    "Culture",
    "Nightlife"
];

class EditProfile extends Component {
    constructor() {
        super();
        this.state = {
            redirect: false,
            school: "",
            name: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    
    componentWillMount = () => {
        this.selectedCheckboxes = new Set();
    }
    
    toggleCheckbox = label => {
        if (this.selectedCheckboxes.has(label)) {
            this.selectedCheckboxes.delete(label);
        } else {
            this.selectedCheckboxes.add(label);
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        const usr = firebase.auth().currentUser;
        const uid = usr.uid;

        // get checked interests
        var interests = [];
        for (const checkbox of this.selectedCheckboxes) {
            interests.push(checkbox)
        }
        // initialize firebase storage
        const storage = firebase.storage();

        // get uploaded profile picture and upload it to 
        const file = event.target.image.files[0];
        const path = uid + '/profilePicture/' + file.name
        var task = storage.ref(path).put(file)
            .then(() => { 
                // get URl reference to stored picture
                const picRef = storage.ref(path);
                picRef.getDownloadURL()
                    .then((url) => {
                        // update user entry in firebase
                        const newInfo = {
                            "interests": interests,
                            "prof_pic": url,
                            "name": this.state.name,
                            "school": this.state.school
                        }

                        firebase.database().ref('users/' + uid).update(newInfo)
                    })
                
            });        
        
        // redirect to next page
        this.setState({redirect: true})
        
    }

    createCheckbox = label => (
        <Checkbox
                label={label}
                handleCheckboxChange={this.toggleCheckbox}
                key={label}
            />
      )
    
    createCheckboxes = () => (
        items.map(this.createCheckbox)
    )

    handleSchoolInputChange(event) {
        this.setState({ school : event.target.value });
    }
    handleNameInputChange(event) {
        this.setState({ name: event.target.value });
    }

    render() {
        if (this.state.redirect === true) {
            return <Redirect to={'/edit_about_me'} />
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
                                <form onSubmit={this.handleSubmit}>
                                    <div className="input_field"> <span><i aria-hidden="true" className="fa fa-lock"></i></span>
                                        <input type="text" 
                                        name="first_name" 
                                        value={this.state.name} 
                                        placeholder="Name"
                                        onChange={this.handleNameInputChange.bind(this)}
                                        required />
                                    </div>

                                    <div className="input_field"><span><i aria-hidden="true" className="fa fa-lock"></i></span>
                                        <input name="name" 
                                        type="text" 
                                        placeholder="Which school will you be attending?"
                                        value={this.state.school}
                                        onChange={this.handleSchoolInputChange.bind(this)}  required />
                                    </div>
                                    <h2>Select your picture</h2>
                                    <input name="image" type="file" accept="image/*" capture></input>
                                    <h2>Interests</h2>
                                    {this.createCheckboxes()}

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
 // props to login_form
function mapStateToProps(state) {
    return {
		active_user: state.active_user
	};
}

export default connect(mapStateToProps)(EditProfile);

/*
           
        */


        /*
        <div className="form_wrapper">
                    <div className="form_container">
                        <div className="title_container">
                            <h2>Welcome to ReConnect!</h2>
                        </div>

                        <div className="row clearfix">
                            <div className="">
                                <form>
                                    <div className="input_field"> <span><i aria-hidden="true" className="fa fa-lock"></i></span>
                                        <input type="email" name="email" placeholder="Email" required />
                                    </div>
                                    <div className="input_field"> <span><i aria-hidden="true" className="fa fa-lock"></i></span>
                                        <input type="password" name="password" placeholder="Password" required />
                                    </div>
                                    <div className="input_field"> <span><i aria-hidden="true" className="fa fa-lock"></i></span>
                                        <input type="password" name="password" placeholder="Re-type Password" required />
                                    </div>
                                    

                                    <div className="row clearfix">
                                        <div className="col_half">
                                            <div className="input_field"> <span><i aria-hidden="true" className="fa fa-user"></i></span>
                                                <input type="text" name="name" placeholder="First Name" />
                                            </div>
                                        </div>
                                

                                        <div className="col_half">
                                            <div className="input_field"> <span><i aria-hidden="true" className="fa fa-user"></i></span>
                                                <input type="text" name="name" placeholder="Last Name" required />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="input_field radio_option">
                                        <input type="radio" name="radiogroup1" id="rd1"/>
                                        <label>Male</label>
                                        <input type="radio" name="radiogroup1" id="rd2"/>
                                        <label>Female</label>
                                    </div>

                                    <div className="input_field select_option">
                                        <select>
                                        <option>Select a country</option>
                                        <option>Option 1</option>
                                        <option>Option 2</option>
                                        </select>
                                        <div className="select_arrow"></div>
                                    </div>

                                    <div className="input_field checkbox_option">
                                        <input type="checkbox" id="cb1"/>
                                        <label>I agree with terms and conditions</label>
                                    </div>
                                    <div className="input_field checkbox_option">
                                        <input type="checkbox" id="cb2"/>
                                        <label>I want to receive the newsletter</label>
                                    </div>
                                    <input className="button" type="submit" value="Register" />
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
                */


                /*
                <div>
                    <ProgressBar now={30} />
                    <Header />
                    <Jumbotron>
                        <h1>Hello</h1>
                        <p>
                            Welcome to a community of millions of students!
                            As a first step, we would love to learn more about you!
                        </p>
                        <form onSubmit={this.handleSubmit} >
                            <h2>Some basic info</h2>
                            <input 
                                className="form-control" 
                                value={this.state.name} 
                                id="name" 
                                placeholder="Enter name"
                                onChange={this.handleNameInputChange.bind(this)}/>
                            <input 
                                className="form-control"
                                value={this.state.school} 
                                id="school" 
                                placeholder="Which school are you going to attend?"
                                onChange={this.handleSchoolInputChange.bind(this)}/>
                            <h2>Select your picture</h2>
                            <input name="image" type="file" accept="image/*" capture></input>

                            <h2>Interests</h2>
                            {this.createCheckboxes()}

                            <button className="btn btn-seconday">Next</button>
                        </form>
                    </Jumbotron>
            </div>
            */