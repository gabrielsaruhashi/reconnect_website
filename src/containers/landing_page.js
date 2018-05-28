import React, { Component } from 'react';

export default class LandingPage extends Component {
  render() {
    return (
      <div className="landing"> 
      
        <header className="header_">
                <div className="header__logo-box">
                        <img src="../../public/logo.png" alt="Logo" className="header__logo"/>
                </div>

                <div className="header__text-box">        
                    <h1 className="heading-primary">
                        <span className="heading-primary--main">ReConnect</span>
                        <span className="heading-primary--sub">Bridging Realities</span>
                    </h1>
                <a href="#" className="btnl btn--white btn--animated">Discover tours</a>
                </div>     
            
            </header>
          </div>
    );
  }
}
