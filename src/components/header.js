import React, {Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Image} from 'react-bootstrap'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { setCurrentUser } from '../actions/index'
class Header extends Component {
 
  render() {
    return(
      <nav>
        <div className='app-brand'>
          <span className='red'>Project</span>
          <span>ReConnect</span>
        </div>
        <ul className='links'>
          <li>
            <Link to="/">Conversations</Link>
          </li>
          <li>
            <Link to="/">Opportunities</Link>
          </li>
          <li>
            <Link to="/">Explore</Link>
          </li>
        </ul>
      </nav>
    )
  }
}
function mapStateToProps(state) {
	return {
    active_user: state.active_user,
    authenticated: state.authenticated
	};
}


export default connect(mapStateToProps)(Header);