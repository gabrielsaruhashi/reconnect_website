import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Jumbotron, Button, Form, FormGroup, Checkbox } from 'react-bootstrap';  

class EditProfile extends Component {
    render() {
        <ProgressBar now={30} />;
        <Jumbotron>
            <h1>Hello</h1>
            <p>
                Welcome to a community of millions of students!
                As a first step, we would love to learn more about you!
            </p>
            <p>
                <Button bsStyle="primary">Learn more</Button>
            </p>

            <form>
                <h2>Interests</h2>
                <FormGroup>
                    <Checkbox>Sports</Checkbox> <Checkbox>Computer Science</Checkbox>{' '}
                    <Checkbox>3</Checkbox>
                </FormGroup>
            </form>
        </Jumbotron>;

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
    return bindActionCreators( null, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
