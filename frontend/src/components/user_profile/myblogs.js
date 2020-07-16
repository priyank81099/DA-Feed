import React, { Component } from 'react'
import axios from "axios";
import { SERVER_URL } from "../../utils/constants";
import BlogComponent from "../allpages/Bolgcomponent.js";
import './main.css';

export default class myblogs extends Component {

    state = {
        posts: [],
        filteredList: []
    }

    componentDidMount() {

        axios.get(`${SERVER_URL}/posts`).then(posts => {
            const { data } = posts;
            this.setState({
                posts: data,
                filteredList: data
            });
        });
    }

    render() {
        const { posts } = this.state;
        return (
            <div className="blogbtnclass">
                <br/> <br/>
                {posts.reverse().map(post => {
                    if (post.user_id === localStorage.getItem("token"))
                    {
                        return (<div >
                            <BlogComponent post_id ={post._id}
                                id={post.user_id}
                                title={post.title}
                                catagory={post.catagory}
                                content={post.content}
                                user_name={post.user_name}
                                current_user={post.user_id}
                            /> <br /><br />
                        </div>
                        )
                    }
                    else{return null;}
                })
                } </div>
        )
    }
}