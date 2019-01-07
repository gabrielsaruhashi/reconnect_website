import React from "react";
import { Link } from "react-router-dom";
import _ from "lodash";

const ICONS = {
  Soccer: "fa fa-futbol-o",
  Travel: "fa fa-plane",
  Outdoors: "fa fa-map-o",
  Music: "fa fa-music",
  Art: "fa fa-paint-brush",
  Games: "fa fa-gamepad",
  Photography: "fa fa-camera",
  Coffee: "fa fa-coffee",
  Food: "fa fa-glass",
  Nightlife: "fa fa-beer"
};

function renderIcons(interests) {
  return _.map(Object.keys(interests), interest => {
    const icon = ICONS[interest];
    return <i className={icon} key={interest} aria-hidden="true" />;
  });
}
const Suggestion = ({ suggestion }) => {
  const REDIRECT_URL = `/usr/${suggestion.uid}`;
  return (
    <Link to={REDIRECT_URL}>
      <div className="content">
        <div className="card">
          <div className="firstinfo">
            <img src={suggestion.prof_pic} />
            <div className="profileinfo">
              <h1>{suggestion.name}</h1>
              <h3>{suggestion.school}</h3>
              <p className="bio">{suggestion.about_me}</p>
            </div>
          </div>
        </div>
        {/* <div className="badgescard">{renderIcons(suggestion.interests)}</div> */}
      </div>
    </Link>
  );
};

// const Suggestion = ({suggestion}) => {
//     return (
//             <figure className="snip1515">
//                 <div className="profile-image"><img src={suggestion.prof_pic} alt="sample70" /></div>
//                 <figcaption>
//                     <h3>Ruby Von Rails</h3>
//                     <h4>Public Relations</h4>
//                     <p>The only skills I have the patience to learn are those that have no real application in life. </p>
//                     <div className="icons"><a href="#"><i className="ion-social-reddit"></i></a>
//                     <a href="#"> <i className="ion-social-twitter"></i></a>
//                     <a href="#"> <i className="ion-social-vimeo"></i></a>
//                     </div>
//                 </figcaption>
//             </figure>
//     )
// }

export default Suggestion;

/*
<i class="fa fa-futbol-o" aria-hidden="true"></i>
<span className="devicons devicons-django"></span><span className="devicons devicons-python"> </span><span className="devicons devicons-codepen"></span><span className="devicons devicons-javascript_badge"></span><span className="devicons devicons-gulp"></span><span className="devicons devicons-angular"></span><span className="devicons devicons-sass"> </span>*/
