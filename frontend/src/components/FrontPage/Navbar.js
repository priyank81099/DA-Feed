import React from 'react';
import './front.css';
import { Link } from "react-router-dom";

const Navbar = () => {
  const user = localStorage.getItem("token");
  const isLoggedIn = (user === null) ? false : true;

  const handleSubmit = e => {
    localStorage.removeItem("token");
  }

  return (
    <div className="sticky">
      <div id="navbar">
      <ul>
        <div className="cont">
        <Link exact to={"/front/recent"}>
          <li>
            <a href="/#">Home</a>
          </li>
        </Link>
        {isLoggedIn ?
            <Link exact to="/front/create-blog">
              <li className="make_it_left">
                <a href="/#">Create Blog</a>
              </li>
            </Link> : null
        }
        <Link to={"/about"}>
          <li>
            <a href="/#">About Us</a>
          </li>
        </Link>
        <Link to={"/help"}>
          <li>
            <a href="/#">Help</a>
          </li>
        </Link>
        {isLoggedIn ?
          <Link to={"/profile/viewprofile/" + user}>
            <li>
              <a href="/#">Profile</a>
            </li>
          </Link>
          : <Link to="/login">
            <li className="login">
              <a href="/#">Log in</a>
            </li>
          </Link>
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
    </div>
  );
};

export default Navbar;
