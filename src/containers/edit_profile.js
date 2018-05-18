import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Jumbotron, Button, Form, FormGroup, Checkbox, ProgressBar } from 'react-bootstrap';  
import Header from '../components/header'
import firebase from 'firebase'

class EditProfile extends Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
      }

    handleSubmit(event) {
        event.preventDefault();
        console.log(event.target.image.files[0])
        const usr = firebase.auth().currentUser;
        const name = usr.displayName

        var interests = [];
        for (var i = 0; i < this.refs.interests.props.children.length; i++) {
            const checkbox = this.refs.interests.props.children[i];
             
        }

        const file = event.target.image.files[0];
        const path = usr.uid + '/profilePicture/' + file.name
        var storageRef = firebase.storage().ref(path);
        // store
        var task = storageRef.put(file);
    
        var picRef = firebase.storage().ref().child(path).fullPath;
        const user = {
            name: {
                "email": usr.email,
                "prof_picture": picRef
            }        
        }
        //firebase.database().ref('users/' + "gabe").put(user)

    
      }

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
                        <FormGroup ref="interests">
                            <Checkbox name="sports">Sports</Checkbox> <Checkbox name="cs">Computer Science</Checkbox>{' '}
                            <Checkbox name="culture">Culture</Checkbox>
                        </FormGroup>
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
