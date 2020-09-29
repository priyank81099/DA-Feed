import React, { Component } from 'react'
import { Button, Grid, Header, Segment,Form,Message } from 'semantic-ui-react'
import './style.css';
import {Link} from "react-router-dom"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { Redirect } from "react-router-dom";
import axios from "axios";
import { SERVER_URL } from "../../utils/constants";


toast.configure();

const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  );
  
const formValid = ({ formErrors, ...rest }) => {
    let valid = true;
  
    // validate form errors being empty
    Object.values(formErrors).forEach(val => {
      val.length > 0 && (valid = false);
    });
  
    // validate the form was filled out
    Object.values(rest).forEach(val => {
      val === null && (valid = false);
    });
  
    return valid;
     };

class SignUpPage extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
          email: null,
          formErrors: {
            email: ""
          },
          redirect:false
        };
      }

      showMassege = (e) => { 
        toast('Verifiaction Email has been sent!', {position: toast.POSITION.BOTTOM_CENTER});
      }

      showMassege_invalid = () =>{
        toast.error('Email Address is alredy Registered', {position: toast.POSITION.BOTTOM_CENTER});
      }

      handleRedirect = () => {
        this.setState({
          redirect:true
        })
     };

      returnRedirect = () => {
        return this.state.redirect ? <Redirect to="/" /> : null;
      };

      handleSubmit = e => {
        e.preventDefault();
    
        if (formValid(this.state)) 
        {
          const user = this.state;
          axios.post(`${ SERVER_URL }/checkinusers`, user)
          .then(res => {
          if (res.data.email === user.email) 
          {
            localStorage.setItem(user.email, res.data.slug_link);
            localStorage.setItem("Current_Email", user.email);
            this.showMassege();
            this.handleRedirect();
          }
          else {
            this.showMassege_invalid();
          }
          })
          .catch(error => {
            console.log(error);
          });
        }
      };

      onchange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        let formErrors = { ...this.state.formErrors };
        
        switch (name) {
          case "email":
            formErrors.email = emailRegex.test(value)
              ? ""
              : "yes";
            break;
          default:
            break;
        }
    
        this.setState({ formErrors, [name]: value });
      };

    render() {
        const { formErrors,first_name,last_name,email,password } = this.state;
        return (
        <div className="loginback">
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <div className="loginbox">
              <Header as='h1' color='teal' textAlign='center' style={{ fontSize: "35px", textShadow: "0px 0px #ff0000" }}>
                Create New Account
              </Header>
              <Form size='large'>
                <Segment stacked>
                <Form.Input
                  error={formErrors.email.length>0 ? {
                    content:"Invalid email address",
                    pointing: 'below',
                  } : null}
                  fluid icon='mail'
                  iconPosition='left'
                  placeholder='E-mail address'
                  type='email'
                  value={email}
                  name="email"
                  onChange={this.onchange} />

                    <Button color='teal' fluid size='large' type='submit' onClick={this.handleSubmit}>
                    Verify Email
                  </Button>
                  <br/>

                  Verify your email first to enter details
                  <br/> <br/>

                  <Form.Input
                  fluid icon='user' 
                  iconPosition='left' 
                  placeholder='First Name'
                  readOnly
                  />
                  <Form.Input 
                  fluid icon='user'
                  iconPosition='left'
                  placeholder='Last Name'
                  readOnly
                  />
                  <Form.Input
                  fluid icon='lock'
                  iconPosition='left'
                  placeholder='Password'
                  type='password'
                  readOnly
                  />
                  {this.returnRedirect()}
                  <Button color='teal' fluid size='large' type='submit' disabled>
                    Sign Up
                  </Button>
                </Segment>
              </Form>
              <Message>
                already have an account?
                <Link to="/login">
                <a href="/#"> Login</a>
                </Link>
              </Message>
            </div>
          </Grid.Column>
        </Grid>
        </div>
        )
    }
}

export default SignUpPage
