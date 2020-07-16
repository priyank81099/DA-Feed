import React, { useState } from 'react'
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'
import { Link, Redirect } from "react-router-dom";
import './style.css';
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { SERVER_URL } from "../../utils/constants";

const LoginForm = () => {

  const [user, setUser] = useState({ email: "", password: "" });
  const [redirect, setRedirect] = useState(false);

  const onchange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const showMassege = (e) => {
    toast.error('Invalid Email or Password', { position: toast.POSITION.BOTTOM_CENTER });
  }

  const handleSubmit = e => {
    e.preventDefault();
    axios.post(`${ SERVER_URL }/users/login`, user)
      .then(res => {
        if (res.data.email === user.email) {
          localStorage.setItem("token", res.data._id);
          localStorage.setItem(res.data._id, res.data.first_name + ' ' + res.data.last_name);
          localStorage.setItem(res.data.first_name + ' ' + res.data.last_name, res.data.profile_image);
          handleRedirect();
        }
        else{
          showMassege();
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleRedirect = () => {
    setRedirect(true);
  };

  const returnRedirect = () => {
    return redirect ? <Redirect to="/front/recent" /> : null;
  };

  return (
    <div className="loginback">
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>

          <div className="loginbox">
            <Header as='h1' color='teal' textAlign='center' style={{ fontSize: "35px", textShadow: "0px 0px #ff0000" }}>
              Log-in to your account
              </Header>
            <Form size='large'>
              <Segment stacked>
                <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' value={user.email} name="email" onChange={onchange} />
                <Form.Input fluid icon='lock' iconPosition='left' placeholder='Password' type='password' name="password" value={user.password} onChange={onchange} />
                {returnRedirect()}
                <Button color='teal' fluid size='large' type='submit' onClick={handleSubmit}>
                  Login
                    </Button>
              </Segment>
            </Form>
            <Message>
              New to us?
          <Link to="/signup">
                <a href="/#"> Sign Up </a>
              </Link>
            </Message>
            <Message>
          <Link to="/forgotpassword">
                <a href="/#"> Forgot Password? </a>
              </Link>
            </Message>
          </div>
        </Grid.Column>
      </Grid>
    </div>
  )
}

export default LoginForm
