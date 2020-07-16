import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
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

const App = () => {
  return (
    <div>
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
};
export default App;
