import React from 'react';
import './main.css';
import { Link } from "react-router-dom";


const UserNav = () => {

    const user_id = localStorage.getItem("token");
    const isLoggedIn = (user_id === null) ? false : true;

    const handleSubmit = e => {
        localStorage.removeItem("token");
    }

    return (
        <div id="navbar" className="sticky">
            <ul>
            <div className="cont">
                <Link exact to={"/front/recent"}>
                    <li>
                    <a href="/#">Home</a>
                    </li>
                </Link>
                {isLoggedIn ?
                    <Link to={"/profile/viewprofile/" + user_id}>
                        <li>
                            <a href="/#">My Profile</a>
                        </li>
                    </Link>
                    : <Link to="/login">
                        <li className="login">
                            <a href="/#">Log in</a>
                        </li>
                    </Link>
                }
                {isLoggedIn ?
                    <Link to="/profile/viewblogs">
                        <li>
                            <a href="/#">My Blogs</a>
                        </li>
                    </Link> : null
                }
                {isLoggedIn ?
                    <Link to="/profile/editprofile">
                        <li>
                            <a href="/#">Edit Profile</a>
                        </li>
                    </Link> : null
                }
                {isLoggedIn ?
                    <Link to="/front/recent">
                        <li>
                            <a onClick={handleSubmit} href="/#">Logout</a>
                        </li>
                    </Link> : null
                }
                </div>
            </ul>
        </div>
    );
};

export default UserNav;
