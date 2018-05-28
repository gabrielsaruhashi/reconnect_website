import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from '../components/header';
import Checkbox from '../components/checkbox';
import { Redirect } from 'react-router-dom';
import firebase from 'firebase';
import FontAwesome from 'react-fontawesome';
import MultipleSelect from '../components/mutiple_select';
import Slider from 'rc-slider';
import Tooltip from 'rc-tooltip';

import 'rc-slider/assets/index.css';

const BUCKET = "project-reconnect.appspot.com/"

const items = [
    "Sports",
    "Culture",
    "Nightlife"
];

const Handle = Slider.Handle;

const handle = (props) => {
    const { value, dragging, index, ...restProps } = props;
    return (
      <Tooltip
        prefixCls="rc-slider-tooltip"
        overlay={value}
        visible={dragging}
        placement="top"
        key={index}
      >
        <Handle value={value} {...restProps} />
      </Tooltip>
    );
  };

class EditProfile extends Component {
    constructor() {
        super();
        this.state = {
            redirect: false,
            school: "",
            name: "",
            interests: [],
            selected_picture: "",
            age: 18
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleSubmit(event) {
        event.preventDefault();
        const usr = firebase.auth().currentUser;
        const uid = usr.uid;

        // initialize firebase storage
        const storage = firebase.storage();

        // convert array of intesrests to object
        const { interests } = this.state;
        var interests_dict = {}
        for (let i = 0; i < interests.name.length; i++) {
            interests_dict[interests.name[i]] = true;
        }

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

  

    handleSchoolInputChange(event) {
        this.setState({ school : event.target.value });
    }
    handleNameInputChange(event) {
        this.setState({ name: event.target.value });
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

    handleSliderChange(e) {
        console.log(e);
    }

    

    render() {
        if (this.state.redirect === true) {
            return <Redirect to={'/edit_about_me'} />
        }
        const { age } = this.state;
        
        const selected_picture = this.state.selected_picture ? this.state.selected_picture : "https://www.ischool.berkeley.edu/sites/default/files/default_images/avatar.jpeg" 
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
                                    <div className="circled-profPic select-pic" style={{backgroundImage: 'url(' + selected_picture + ')'}}>
                                        <input name="image" type="file" accept="image/*" onChange={(e) => this.handlePictureChange(e)} capture></input>
                                    </div>
                                    <h2>Interests</h2>
                                    <MultipleSelect onInterestSelect={ (interests) => this.setState({interests}) }/>

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