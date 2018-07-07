import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Navbar,
  Nav,
  NavItem,
  NavDropdown,
  MenuItem,
  Image
} from "react-bootstrap";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import firebase from "firebase";
import { setCurrentUser } from "../actions/index";

// Icon
const IconBookmark = props => {
  const fill = props.fill || "orange";

  return (
    <div className="user-nav__icon-box">
      <svg className="user-nav__icon">
        <title id="title">Bookmark</title>
        <path
          fill={fill}
          d="M14 2v17l-4-4-4 4v-17c0-0.553 0.585-1.020 1-1h6c0.689-0.020 1 0.447 1 1z"
        />
      </svg>
      <span className="user-nav__notification">7</span>
    </div>
  );
};

const IconChat = props => {
  const fill = props.fill || "orange";

  return (
    <div className="user-nav__icon-box">
      <svg className="user-nav__icon">
        <title id="title">Chat</title>
        <path
          fill={fill}
          d="M5.8 12.2v-6.2h-3.8c-1.1 0-2 0.9-2 2v6c0 1.1 0.9 2 2 2h1v3l3-3h5c1.1 0 2-0.9 2-2v-1.82c-0.064 0.014-0.132 0.021-0.2 0.021l-7-0.001zM18 1h-9c-1.1 0-2 0.9-2 2v8h7l3 3v-3h1c1.1 0 2-0.899 2-2v-6c0-1.1-0.9-2-2-2z"
        />
      </svg>
      <span className="user-nav__notification">13</span>
    </div>
  );
};

class Header extends Component {
  render() {
    const { active_user } = this.props;
    const picture_url = active_user
      ? active_user.prof_pic
      : "https://static.licdn.com/scds/common/u/images/themes/katy/ghosts/person/ghost_person_200x200_v1.png";
    const name = active_user ? active_user.name : "Loading...";
    return (
      <header className="header_nav ">
        <Link to="/">
          <img src="../../public/logo.png" alt="trillo logo" className="logo" />
        </Link>

        <nav className="user-nav">
          <Link to="/">
            <IconBookmark />
          </Link>
          <Link to="/inbox">
            <IconChat />
          </Link>
          <Link to="edit">
            <div className="user-nav__user">
              <img
                src={picture_url}
                alt="User photo"
                className="user-nav__user-photo"
              />
            </div>
          </Link>
        </nav>
      </header>
    );
  }
}
function mapStateToProps(state) {
  return {
    active_user: state.active_user
  };
}

export default connect(mapStateToProps)(Header);
