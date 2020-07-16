import React from "react";
import UserNav from './user_nav';
import { Switch, Route } from "react-router-dom";
import Myblogs from './myblogs'
import ViewProfile from './viewprofile'
import EditProfile from './Editprofile'

const Profile = () => {

  return (
    <div> 
      <UserNav />
      <Switch>
        <Route path='/profile/viewprofile/:user_id' component={ViewProfile} />
        <Route path="/profile/viewblogs" component={Myblogs} />
        <Route path='/profile/editprofile' component={EditProfile} />
      </Switch>
    </div>
  );
};

export default Profile;
