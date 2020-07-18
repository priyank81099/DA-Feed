import React, { Component }  from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import {isMobile} from 'react-device-detect'
import HomePageLayout from "./components/Homepage/index.js";
import Profile from "./components/user_profile/Profile";
import Login from "./components/Auth/Login.js";
import SignUpForm from "./components/Auth/SignUpForm.js";
import Front from "./components/FrontPage/front.js";
import About_us from "./components/Footerpages/About_us.js";
import Help from "./components/Footerpages/Help"
import ForgotPassword from "./components/Auth/ForgotPassword.js";
import ResetPassword from "./components/Auth/ResetPassword.js";
import './index.css';
import axios from "axios";
import { SERVER_URL } from "./utils/constants";

class App extends Component {

  state = {
    users: [],
    filteredList: []
  }

  componentDidMount() {
    axios.get(`${SERVER_URL}/users`).then(users => {
      const { data } = users;
      this.setState({
        users: data,
        filteredList: data
      });
    });
  }

  render(){
    const { users } = this.state;
	
	{
		if(isMobile) {
			return (
				<div> This Website is unavailable on mobile</div>
			)
		}
	}
	
    return (
      <div>
        {
          users.map(user =>{
            localStorage.setItem(user._id+user.first_name+" "+user.last_name, user.profile_image)
          })
        }
        <Router>
          <Switch>
            <Route path="/" exact component={HomePageLayout} />
            <Route path="/about" component={About_us} />
            <Route path="/help" component={Help}/>	
            <Route path="/profile" component={Profile} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={SignUpForm} />
            <Route path="/front" component={Front} />
            <Route path="/forgotpassword" exact component={ForgotPassword} />
            <Route path="/resetpassword/:slug" component={ResetPassword} />
          </Switch>
        </Router>
      </div>
    );
  }
};

export default App;
