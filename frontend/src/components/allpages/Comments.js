import React, { Component } from 'react';
import './main.css'
import axios from "axios";
import { SERVER_URL } from "../../utils/constants";
import Commentcomp from "./Commentcomp.js";

class Comments extends Component {

  state = {
    comments: [],
    filteredList: []
  }

  componentDidMount() {
    axios.get(`${SERVER_URL}/comments`).then(comments => {
      const { data } = comments;
      this.setState({
        comments: data,
        filteredList: data
      });
      //console.log(this.state.posts);
    });
  }

  render() {
    const { comments } = this.state;
    return (
      <div>
        {comments.map(comment => {
          if (comment.post_id === this.props.post_id)
          {
            return (
              <div>
                <Commentcomp content={comment.content} user_name={comment.user_name} id={comment.user_id}></Commentcomp>
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

export default Comments;
