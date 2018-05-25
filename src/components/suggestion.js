import React from 'react';
import { Link } from 'react-router-dom';

const Suggestion = ({suggestion}) => {
    const REDIRECT_URL = `/usr/${suggestion.uid}`;
    /*return (
        <div className="suggestion_wrapper">
            <div className="profPic" style={{backgroundImage: 'url(' + suggestion.prof_pic + ')'}}/>
            <div className="profile_box">
                <div className="box_header">
                    <h2>{suggestion.name}</h2>
                    <h3>{suggestion.school}</h3>
                </div>
                <p>{suggestion.about_me}</p>
            </div>
            <div className="invite_banner">
                <Link to={REDIRECT_URL}>
                <h3>View<br/>Profile<br/></h3>
                <span><i aria-hidden="true" className="fa fa-chevron-circle-right"></i></span>
                </Link>
            </div>
        </div>
    );*/
    
    return (
        <Link to={REDIRECT_URL}>
            <div className="content">
                <div className="card">
                    <div className="firstinfo"><img src={suggestion.prof_pic}/>
                    <div className="profileinfo">
                        <h1>{suggestion.name}</h1>
                        <h3>{suggestion.school}</h3>
                        <p className="bio">{suggestion.about_me}</p>
                    </div>
                    </div>
                </div>
                <div className="badgescard"> <span className="devicons devicons-django"></span><span className="devicons devicons-python"> </span><span className="devicons devicons-codepen"></span><span className="devicons devicons-javascript_badge"></span><span className="devicons devicons-gulp"></span><span className="devicons devicons-angular"></span><span className="devicons devicons-sass"> </span></div>
            </div>
        </Link>
    )
}

export default Suggestion;