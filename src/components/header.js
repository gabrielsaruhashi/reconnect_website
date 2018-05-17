import React, {Component} from 'react';
import { Link } from 'react-router-dom';



export default class Header extends Component {

  render() {
    return (
      <div>
        <Link className="btn btn-primary" to="/posts/new">
        Log in
        </Link>
      </div>
    );
  }
}

