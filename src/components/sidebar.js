import React, { Component } from 'react';

const Sidebar = ({ user }) => {
    return (
        <div className="sidebar">   
            {user?
                (
                    <div>
                        <img className="profPic" src={user.prof_pic}/>
                        <h2>{user.name}</h2>
                    </div>
                ) : (
                    <div>
                        <img className="profPic" src="https://static.licdn.com/scds/common/u/images/themes/katy/ghosts/person/ghost_person_200x200_v1.png"/>
                        <h2>Loading profile...</h2>
                    </div>
                )}
        </div>
    )
}


export default Sidebar;