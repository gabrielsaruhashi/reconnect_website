import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Jumbotron, Button, Form, FormGroup, ProgressBar } from 'react-bootstrap';  
import Header from '../components/header';
import Checkbox from '../components/checkbox';
import { Redirect } from 'react-router-dom';
import firebase from 'firebase';

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
        return(

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
