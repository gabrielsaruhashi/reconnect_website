import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Jumbotron, Button, Form, FormGroup, ProgressBar } from 'react-bootstrap';  
import Header from '../components/header';
import Checkbox from '../components/checkbox';
import { Redirect } from 'react-router-dom';
import firebase from 'firebase';

const items = [
    "Sports",
    "Culture",
    "Nightlife"
];

class EditProfile extends Component {
    constructor() {
        super();
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
        const name = usr.displayName

        var interests = [];
        for (const checkbox of this.selectedCheckboxes) {
            interests.push(checkbox)
        }
      

        const file = event.target.image.files[0];
        const path = usr.uid + '/profilePicture/' + file.name
        var storageRef = firebase.storage().ref(path);
        // store
        var task = storageRef.put(file);
    
        var picRef = firebase.storage().ref().child(path);
        const user = {
            name: {
                "email": usr.email,
                "prof_picture": picRef
            }        
        }
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

    render() {
        return(

            <div>
                <Header />
                <ProgressBar now={30} />


                <Jumbotron>
                    <h1>Hello</h1>
                    <p>
                        Welcome to a community of millions of students!
                        As a first step, we would love to learn more about you!
                    </p>
                    <p>
                        <Button bsStyle="primary">Learn more</Button>
                    </p>

                    <form onSubmit={this.handleSubmit} >
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

// dispatch to all
function mapDispatchToProps(dispatch) {
    return bindActionCreators( {}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
