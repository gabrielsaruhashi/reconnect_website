import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from '../components/header';
import Checkbox from '../components/checkbox';
import { Redirect } from 'react-router-dom';
import firebase from 'firebase';
import FontAwesome from 'react-fontawesome';
import MultipleSelect from '../components/mutiple_select';
import SingleSelect from '../components/single_select';
import TextField from '@material-ui/core/TextField';

const INTERESTS = [
    'Sports',
    'Soccer',
    'Photography',
    'Coffee',
    'Travel',
    'Games',
    'Music',
    'Outdoors',
    'Food',
    "Nightlife"
];

const SCHOOLS = [
    'De La Salle University- Manila',
    'De La Salle- College of Saint Benilde',
    'Ateneo de Manila University',
    'University of the Philippines',
    'Universitas Indonesia',
    'Chulalongkorn University',
    'Mahidol University'
];

const DEFAULT_PICTURE = "https://www.ischool.berkeley.edu/sites/default/files/default_images/avatar.jpeg";

class EditProfile extends Component {
    constructor() {
        super();
        this.state = {
            redirect: false,
            school: "",
            name: "",
            interests: [],
            selected_picture: "",
            age: "",
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleSubmit(event) {
        event.preventDefault();
        const usr = firebase.auth().currentUser;
        const uid = usr.uid;
        const storage = firebase.storage();
        // convert array of intesrests to object
        const { interests } = this.state;
        var interests_dict = {};
        console.log(interests);
        for (let i = 0; i < interests.name.length; i++) {
            interests_dict[interests.name[i]] = true;
        }
        // get uploaded profile picture and upload it to 
        const file = event.target.image.files[0];
        const path = uid + '/profilePicture/' + file.name;
        var task = storage.ref(path).put(file)
            .then(() => { 
                // get URl reference to stored picture
                const picRef = storage.ref(path);
                picRef.getDownloadURL()
                    .then((url) => {
                        // update user entry in firebase
                        const newInfo = {
                            "interests": interests_dict,
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

    handlePictureChange(event) {
        const file = event.target.files[0];
        var reader = new FileReader();
        var url = reader.readAsDataURL(file);

        reader.onloadend = function (e) {
            this.setState({
                selected_picture: [reader.result]
            })
        }.bind(this);
    }

    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
      };
    
    render() {
        if (this.state.redirect === true) {
            return <Redirect to={'/edit_about_me'} />
        }
        const { age } = this.state;
        const selected_picture = this.state.selected_picture ? this.state.selected_picture : DEFAULT_PICTURE; 

        return (
            <div>
                <div className="form_wrapper">
                    <img className="" src="../../public/logo.png"/>
                    <div className="form_container">
                        <div className="title_container">
                            <h1>Welcome to ReConnect!</h1>
                        </div>

                        <div className="row clearfix">
                            <div className="">

                                
                                <form className="form-profile-edit" onSubmit={this.handleSubmit}>
                                    <div className="input_field"> <span><i aria-hidden="true" className="fa fa-lock"></i></span>
                                        <input type="text" 
                                        name="first_name" 
                                        value={this.state.name} 
                                        placeholder="Name"
                                        onChange={this.handleChange('name')}
                                        required />
                                    </div>

                                    <div className="input_field"> <span><i aria-hidden="true" className="fa fa-lock"></i></span>
                                        <input type="text" 
                                            name="age" 
                                            value={this.state.age} 
                                            placeholder="Age"
                                            onChange={this.handleChange('age')}
                                            required 
                                        />
                                    </div>
                                    <SingleSelect 
                                        OnSelectEvent={ (school) => this.setState({school}) } 
                                        fields={SCHOOLS}
                                    />
                                    <h2>Interests</h2>
                                    <MultipleSelect 
                                        OnSelectEvent={ (interests) => this.setState({interests}) } 
                                        fields={INTERESTS}
                                    />

                                    <h2>Select your picture</h2>
                                    <div className="circled-profPic select-pic" style={{backgroundImage: 'url(' + selected_picture + ')'}}>
                                        <input name="image" type="file" accept="image/*" onChange={(e) => this.handlePictureChange(e)} capture></input>
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

export default connect(null)(EditProfile);