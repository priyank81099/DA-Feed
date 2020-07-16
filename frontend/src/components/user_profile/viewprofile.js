import React, { Component } from 'react'
import { SERVER_URL } from "../../utils/constants";
import axios from "axios";
import { Redirect } from 'react-router';
import { Grid } from "semantic-ui-react";
import './main.css'

export default class myprofile extends Component {

    state = {
        users: [],
        filteredList: [],
        user_id: ""
    }

    componentDidMount() 
    {
        this.setState({
            user_id : this.props.match.params.user_id
        })
        if (this.state.user_id === null || this.state.user_id === 'null') {
            return <Redirect to="/front/recent" />
        }

        axios.get(`${SERVER_URL}/users`).then(users => {
            const { data } = users;
            this.setState({
                users: data,
                filteredList: data
            });
            console.log(this.state.users);
        });

    }

    render() {
        const { users } = this.state;
        return (
            <div > {
                users.reverse().map(user => {
                    if (user._id === this.state.user_id)
                    {
                        return (
                            <Grid >
                                <Grid.Row >
                                    <Grid.Column width={7} >
                                        <img src={user.profile_image}
                                            alt="defaultImage"
                                            height="297"
                                            width="270"
                                            className="ProfileImg"/>
                                    </Grid.Column>
                                    <Grid.Column stretched width={9} >
                                        <div className='user_component' >
                                            <h1 className='user_name' > {user.first_name} {user.last_name} </h1>
                                            <h2 > Email: {user.email} </h2>
                                            <hr /><br />
                                            {
                                                user.facebook !== null && user.facebook !== 'null' && user.facebook !== "" ?
                                                    <div><h2>Facebook Id: <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">{user.facebook}</a></h2><br /></div> : null
                                            }
                                            {
                                                user.linkedin !== null && user.linkedin !== 'null' && user.linkedin !== "" ?
                                                    <div><h2>Linkedin Id: <a href={'https://www.linkedin.com/in/'+user.linkedin} target="_blank" rel="noopener noreferrer">{user.linkedin}</a></h2><br /></div> : null
                                            }
                                            {
                                                user.instagram !== null && user.instagram !== 'null' && user.instagram !== "" ?
                                                    <div><h2>Instagram Id: <a href={'https://www.instagram.com/'+user.instagram} target="_blank" rel="noopener noreferrer">{user.instagram}</a></h2><br /></div> : null
                                            }
                                        </div>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        )
                    }
                    else{return null;}
                })
            }
            </div>
        )
    }
}