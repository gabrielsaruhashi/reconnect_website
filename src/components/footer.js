import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


const Footer = props => (
  <footer className='footer'>
    <div className='footer-left'>
      <span>&copy; 2018 Project Reconnect</span>
    </div>
    <div className='footer-right'>
      <span><a target='_blank'>Terms & Conditions</a> | </span>
      
    </div>
   
  </footer>
)

export default Footer;