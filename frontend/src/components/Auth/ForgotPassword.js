import React, { useState } from 'react'
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react'
import { Redirect } from "react-router-dom";
import './style.css';
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { SERVER_URL } from "../../utils/constants";

const ForgotPassword = (props) => {

  const [user, setUser] = useState({ email: "" });
  const [redirect, setRedirect] = useState(false);

  const onchange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const showMassege_error = (e) => {
    toast.error('Email is not Registered', { position: toast.POSITION.BOTTOM_CENTER });
  }

  const showMassege = (e) => {
    toast('Email has been sent!', { position: toast.POSITION.BOTTOM_CENTER });
  }

  const handleSubmit = e => {
    e.preventDefault();
    axios.post(`${ SERVER_URL }/forgotpassword`, user)
      .then(res => {
        if (res.data.email === user.email) {
          localStorage.setItem(user.email, res.data.slug_link);
          localStorage.setItem("Current_Email", user.email);
          showMassege();
          handleRedirect();
        }
        else{
          showMassege_error();
        }
      })
      .catch(error => {
        console.log(props.match.params.slug);
      });
  };

  const handleRedirect = () => {
    setRedirect(true);
  };

  const returnRedirect = () => {
    return redirect ? <Redirect to="/" /> : null;
  };

  return (
    <div className="loginback">
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>

          <div className="loginbox">
            <Header as='h1' color='teal' textAlign='center' style={{ fontSize: "35px", textShadow: "0px 0px #ff0000" }}>
              Enter Registered Email Address
              </Header>
            <Form size='large'>
              <Segment stacked>
                <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' value={user.email} name="email" onChange={onchange} />
                {returnRedirect()}
                <Button color='teal' fluid size='large' type='submit' onClick={handleSubmit}>
                  Send Email
                    </Button>
              </Segment>
            </Form>
          </div>
        </Grid.Column>
      </Grid>
    </div>
  )
}

export default ForgotPassword
