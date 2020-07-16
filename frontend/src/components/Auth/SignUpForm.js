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

class SignUpForm extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
          first_name: null,
          last_name: null,
          email: null,
          password: null,
          formErrors: {
            first_name: "",
            last_name: "",
            email: "",
            password: ""
          },
          redirect:false
        };
      }

      showMassege = (e) => { 
        toast('Your user registration was successful.', {position: toast.POSITION.BOTTOM_CENTER});
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
        return this.state.redirect ? <Redirect to="/login" /> : null;
      };

      handleSubmit = e => {
        e.preventDefault();
    
        if (formValid(this.state)) 
        {
          const user = this.state;
          axios.post(`${ SERVER_URL }/users`, user)
          .then(res => {
          if (res.data.email === user.email) 
          {
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
          case "first_name":
            formErrors.first_name =
              value.length < 3 ? "yes" : "";
            break;
          case "last_name":
            formErrors.last_name =
              value.length < 3 ? "yes" : "";
            break;
          case "email":
            formErrors.email = emailRegex.test(value)
              ? ""
              : "yes";
            break;
          case "password":
            formErrors.password =
              value.length < 6 ? "yes" : "";
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
                Create new account
              </Header>
              <Form size='large'>
                <Segment stacked>
                  <Form.Input
                  error={formErrors.first_name.length>0 ? {
                    content:"Minimum 3 characaters required",
                    pointing: 'below',
                  } : null}
                  fluid icon='user' 
                  iconPosition='left' 
                  placeholder='First Name'
                  value={first_name} 
                  name="first_name"
                  onChange={this.onchange} 
                  />
                  <Form.Input 
                  error={formErrors.last_name.length>0 ? {
                    content:"Minimum 3 characaters required.",
                    pointing: 'below',
                  } : null}
                  fluid icon='user'
                  iconPosition='left'
                  placeholder='Last Name'
                  value={last_name}
                  name="last_name"
                  onChange={this.onchange}
                  />
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
                  <Form.Input
                  error={formErrors.password.length>0 ? {
                    content:"Minimum 6 character required.",
                    pointing:'below',
                  } : null}
                  fluid icon='lock'
                  iconPosition='left'
                  placeholder='Password'
                  type='password'
                  value={password}
                  name="password"
                  onChange={this.onchange} />
                  {this.returnRedirect()}
                  <Button color='teal' fluid size='large' type='submit' onClick={this.handleSubmit}>
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

export default SignUpForm
