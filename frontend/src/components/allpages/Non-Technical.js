import React, { Component } from 'react';
import './main.css'
import axios from "axios";
import { SERVER_URL } from "../../utils/constants";
import BlogComponent from "./Bolgcomponent.js";

class Nontechnical extends Component {

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
      //console.log(this.state.posts);
    });
  }

  render() {
    const { posts } = this.state;
    return (
      <div className="blogbtnclass">
        {posts.reverse().map(post => {
          if (post.catagory === 'non-technical')
          {
            return (
              <div>
                <BlogComponent post_id ={post._id} id={post.user_id} title={post.title} catagory={post.catagory} content={post.content} user_name={post.user_name} />
                <br />
                <br />
              </div>
            )
          }
          else{return null;}
        })}
      </div>
    );
  }
};

export default Nontechnical;
