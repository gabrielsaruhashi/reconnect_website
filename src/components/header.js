import React, {Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Image} from 'react-bootstrap'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { setCurrentUser } from '../actions/index'
class Header extends Component {
  /*
  render() {
    console.log(this.props.authenticated)
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <Image src="../public/logo.png"/>
          </Navbar.Brand>
        </Navbar.Header>
        {
          this.props.authenticated && this.props.active_user? (
            <div>
              <Nav>
                <NavItem eventKey={1} href="#">Link</NavItem>
                <NavItem eventKey={2} href="#">Link</NavItem>
                <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
                  <MenuItem eventKey={3.1}>Action</MenuItem>
                  <MenuItem eventKey={3.2}>Another action</MenuItem>
                  <MenuItem eventKey={3.3}>Something else here</MenuItem>
                  <MenuItem divider />
                  <MenuItem eventKey={3.4}>Separated link</MenuItem>
                </NavDropdown>
              </Nav>
              <Nav pullRight>
                <NavItem eventKey={1} href="#">
                  {this.props.active_user.name}
                </NavItem>
                <NavItem eventKey={2}>
                  

                </NavItem>
              </Nav>
            </div>
          ) : (
            <Nav>
              <NavItem eventKey={1} href="#">Log In/Register</NavItem>
            </Nav>
          )
        }
         
    </Navbar>
    );
  } */

  render() {
    return(
      <nav>
        <div className='app-brand'>
          <span className='red'>Project</span>
          <span>ReConnect</span>
        </div>
        <ul className='links'>
          <li>
            <Link to="/">My Reconnections</Link>
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