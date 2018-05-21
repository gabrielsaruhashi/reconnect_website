import React from 'react';
const Suggestion = ({suggestion}) => {
    return (
        <div className="suggestion_wrapper">
            <img src={suggestion.prof_pic}/>
            <div className="profile_box">
                <div className="box_header">
                    <h2>{suggestion.name}</h2>
                    <h3>{suggestion.school}</h3>
                </div>
                <p>{suggestion.about_me}</p>
            </div>
            <div className="invite_banner">
                <h3>View<br/>Profile<br/></h3>
                <span><i aria-hidden="true" className="fa fa-chevron-circle-right"></i></span>
            </div>
        </div>
	);
}

export default Suggestion;