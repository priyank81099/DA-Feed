import React, { useState } from 'react'
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react'
import {  Redirect } from "react-router-dom";
import './style.css';
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { SERVER_URL } from "../../utils/constants";

const ResetPassword = (props) => {

  const [user, setUser] = useState({ password: "", c_password:"", email:"" });
  const [redirect, setRedirect] = useState(false);

  const onchange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const showMassege_error = (e) => {
    toast.error('Invalid Access', { position: toast.POSITION.BOTTOM_CENTER });
  }

  const showMassege_diff = (e) => {
    toast.error('Both Password are Different', { position: toast.POSITION.BOTTOM_CENTER });
  }

  const showMassege = (e) => {
    toast('Password Changed Sucessfully', { position: toast.POSITION.BOTTOM_CENTER });
  }

  const handleSubmit = e => {
    e.preventDefault();
    const c1 = props.match.params.slug;
    const u_email = localStorage.getItem("Current_Email");
    const c2 = localStorage.getItem(u_email);
    user.email = u_email;

    if(c1 === c2){
      
      if(user.password !== user.c_password) showMassege_diff();
      else{
        axios.patch(`${SERVER_URL}/forgot_password`, user)
                .then(res => {
                  //console.log(res.data);
                  //console.log(user.email);
                    if(res.data !== user.email) showMassege_error();
                    else{ 
                      showMassege();
                      handleRedirect();
                    }
                })
                .catch(err => {
                    console.log(err);
                    showMassege_error();
                });
      }
    }
    else showMassege_error();
  };

  const handleRedirect = () => {
    setRedirect(true);
  };

  const returnRedirect = () => {
    return redirect ? <Redirect to="/login" /> : null;
  };

  return (
    <div className="loginback">
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>

          <div className="loginbox">
            <Header as='h1' color='teal' textAlign='center' style={{ fontSize: "35px", textShadow: "0px 0px #ff0000" }}>
              Enter Password
              </Header>
            <Form size='large'>
              <Segment stacked>
              <Form.Input 
                    fluid icon='lock' 
                    iconPosition='left' 
                    placeholder='Password' 
                    type='password' name="password" 
                    value={user.password} 
                    error={user.password.length<6 && user.password.length>0? {
                      content:"Minimum 6 characaters required.",
                      pointing: 'below',
                    } : null} onChange={onchange} />
              <Form.Input fluid icon='lock' iconPosition='left' placeholder='Confirm Password' type='password' name="c_password" value={user.c_password} onChange={onchange} />
              {returnRedirect()}
                <Button color='teal' fluid size='large' type='submit' onClick={handleSubmit}>
                  Save Changes
                    </Button>
              </Segment>
            </Form>
          </div>
        </Grid.Column>
      </Grid>
    </div>
  )
}

export default ResetPassword
