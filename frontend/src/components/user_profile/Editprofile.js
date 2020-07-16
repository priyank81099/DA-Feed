import React, { Component } from "react";
import { Grid, Form, Button } from "semantic-ui-react";
import "./style.css";
import axios from "axios";
import { SERVER_URL } from "../../utils/constants";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

toast.configure();
class App extends Component {

        constructor() {
            super();
            this.state = {
                password: "",
                c_password:"",
                facebook: "",
                instagram: "",
                linkedin: "",
                profile_image:""
            };
            this.showMassege = this.showMassege.bind(this);
            this.showMassege_diff = this.showMassege_diff.bind(this);
        }

        showMassege = (e) => { 
            toast(e + ' updated successfully', {position: toast.POSITION.TOP_RIGHT});
        }
        showMassege_diff = (e) => {
            toast.error('Both Password are Different', { position: toast.POSITION.BOTTOM_CENTER });
        }

        onchange = (e) => {
            this.setState({
                [e.target.name]: e.target.value
            });
        }

        passwordSubmit = () => {

            if(this.state.password !== this.state.c_password) this.showMassege_diff();
            else{
                const user_id = localStorage.getItem("token");
                axios.patch(`${SERVER_URL}/users/update_password/${user_id}`, this.state)
                    .then(savePost => {
                        this.showMassege("Your Password");
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        }

        facebookSubmit = () => {
            const user_id = localStorage.getItem("token");
            axios.patch(`${SERVER_URL}/users/update_facebook/${user_id}`, this.state)
                .then(savePost => {
                    this.showMassege("Facebook Id");
                })
                .catch(err => {
                    console.log(err);
                });
        }

        instagramSubmit = () => {
            const user_id = localStorage.getItem("token");
            console.log(`${SERVER_URL}/users/update_instagram/${user_id}`);
            axios.patch(`${SERVER_URL}/users/update_instagram/${user_id}`, this.state)
                .then(savePost => {
                    this.showMassege("Instagram Id");
                })
                .catch(err => {
                    console.log(err);
                });
        }

        linkedinSubmit = () => {
            const user_id = localStorage.getItem("token");
            axios.patch(`${SERVER_URL}/users/update_linkedin/${user_id}`, this.state)
                .then(savePost => {
                    this.showMassege("Linkedin Id");
                })
                .catch(err => {
                    console.log(err);
                });
        }

        imageSubmit = () => {
            const user_id = localStorage.getItem("token");
            axios.patch(`${SERVER_URL}/users/update_image/${user_id}`, this.state)
                .then(savePost => {
                    this.showMassege("Profile Image");
                })
                .catch(err => {
                    console.log(err);
                });
        }

        render() {
            return (
                <Grid>
                    <Grid.Row>
                        <div className='maindiv'>
                            <h2 className="edit-bio"> Update Profile Image: </h2>
                            <h4 className="edit-bio">Upload Your Profile Picture <a href="https://www.imageupload.net/" target="_blank" rel="noopener noreferrer"> here </a></h4>
                            <h4 className="edit-bio">And Paste Image URL / Direct Image Link below</h4>
                            <Form.Input className='pass_link' fluid icon='image' iconPosition='left' type='text' placeholder='Eg. https://img.imageupload.net/...' value={this.state.profile_image} name="profile_image" onChange={this.onchange} />
                            <Button
                                type="submit"
                                active
                                style={{ marginTop: "5%" }}
                                onClick={this.imageSubmit}>
                                Update Image URL
                            </Button>
                        </div>
                        <div className='maindiv'>
                            <h2 className="edit-bio"> Change Password? </h2>
                            <Form.Input 
                                className='pass' 
                                fluid icon='lock' 
                                iconPosition='left' 
                                placeholder='New Password' 
                                type='password' 
                                value={this.state.password} 
                                name="password" 
                                error={this.state.password.length<6 && this.state.password.length>0? {
                                    content:"Minimum 6 characaters required.",
                                    pointing: 'below',
                                    } : null}
                                onChange={this.onchange} />
                            <Form.Input className='pass' fluid icon='lock' iconPosition='left' placeholder='Confirm New Password' type='password' value={this.state.c_password} name="c_password" onChange={this.onchange} />
                            <Button
                                type="submit"
                                active
                                style={{ marginTop: "5%" }}
                                onClick={this.passwordSubmit}>
                                Save Password
                        </Button>
                        </div>
                        <div className='maindiv'>
                            <h2 className="edit-bio"> Facebook ID </h2>
                            <Form.Input className='pass' fluid icon='facebook' iconPosition='left' placeholder='Facebook' type='link' value={this.state.facebook} name="facebook" onChange={this.onchange} />
                            <Button
                                type="submit"
                                active
                                style={{ marginTop: "5%" }}
                                onClick={this.facebookSubmit}>
                                Save Changes
                        </Button>
                        </div>
                    </Grid.Row>
                    <Grid.Row>
                        <div className='maindiv'>
                            <h2 className="edit-bio"> LinkedIn ID </h2>
                            <Form.Input className='pass' fluid icon='linkedin' iconPosition='left' placeholder='LinkedIn' type='link' value={this.state.linkedin} name="linkedin" onChange={this.onchange} />
                            <Button
                                type="submit"
                                active
                                style={{ marginTop: "5%" }}
                                onClick={this.linkedinSubmit}>
                                Save Changes
                        </Button>
                        </div>

                        <div className='maindiv'>
                            <h2 className="edit-bio"> Instagram ID </h2>
                            <Form.Input className='pass' fluid icon='instagram' iconPosition='left' placeholder='Instagram' type='link' value={this.state.instagram} name="instagram" onChange={this.onchange} />
                            <Button
                                type="submit"
                                active
                                style={{ marginTop: "5%" }}
                                onClick={this.instagramSubmit}>
                                Save Changes
                        </Button>
                        </div>
                    </Grid.Row>
                </Grid>
            );
        }
    }

export default App;
