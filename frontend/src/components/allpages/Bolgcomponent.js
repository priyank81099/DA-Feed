import React, { Component } from 'react';
import './main.css';
import { Modal } from 'semantic-ui-react'
import { Editor, convertFromRaw, EditorState } from "draft-js";
import { Link } from "react-router-dom";
import { convertToRaw } from "draft-js";
import createEmojiPlugin from "draft-js-emoji-plugin";

import createInlineToolbarPlugin from "draft-js-inline-toolbar-plugin";

import "draft-js-emoji-plugin/lib/plugin.css";
import "draft-js-inline-toolbar-plugin/lib/plugin.css";

import axios from "axios";

import { SERVER_URL } from "../../utils/constants";
import { Button } from "semantic-ui-react";
import { toast } from 'react-toastify';
import Comments from './Comments'
import 'react-toastify/dist/ReactToastify.css'

const emojiPlugin = createEmojiPlugin();
const { EmojiSuggestions } = emojiPlugin;

const inlineToolbarPlugin = createInlineToolbarPlugin();


class Bolgcomponent extends Component {

    constructor() {
        super();
        this.state = {
            content :{},
            user_id : localStorage.getItem("token"),
            post_id :'',
            user_name:'',
            editorState: EditorState.createEmpty()
        };
        this.showMassege = this.showMassege.bind(this);
        this.showMassege_error = this.showMassege_error.bind(this);
        this.showMassege_deletePost = this.showMassege_deletePost.bind(this);
        this.DeleteBlog = this.DeleteBlog.bind(this);
    }

    getText = () => {
        if (!this.props.content.blocks) return null;
        return this.props.content.blocks[0].text;
    }

    onChange = editorState => {
        const contentState = editorState.getCurrentContent();
        this.saveContent(contentState);
        this.setState({
            editorState
        });
    };
     
    saveContent = content => {
        window.localStorage.setItem(
            "content",
            JSON.stringify(convertToRaw(content))
        );
    };

    showMassege = () => { 
        toast('Comment Added successfully', {position: toast.POSITION.BOTTOM_CENTER});
    }

    showMassege_error = () => { 
        toast.error('Empty comment is not Allowed', {position: toast.POSITION.BOTTOM_CENTER});
    }
    showMassege_deletePost = () => {
        toast('Blog Deleted Sucessfully', {position: toast.POSITION.BOTTOM_CENTER});
    }

    onSaveComment = () => {
        const user_id = localStorage.getItem("token");
        const user_name = localStorage.getItem(user_id);
        const { editorState } = this.state;
        const post_id = this.props.post_id;
        const comment = {
            post_id,
            user_id,
            user_name,
            editorState: convertToRaw(editorState.getCurrentContent()),
        }
        const cmt_text = convertToRaw(editorState.getCurrentContent()).blocks[0].text;
        
        if(cmt_text.length === 0){
            this.showMassege_error();
        }
        else{
            axios.post(`${SERVER_URL}/comments/`, comment)
                .then(saveComment => {
                    this.showMassege();
                })
                .catch(err => {
                    console.log(err);
                });
        }
        this.setState({
            editorState: EditorState.createEmpty(),
            user_id: "",
            user_name: "",
            post_id:"",
        });
        window.localStorage.removeItem("content");
    }

    DeleteBlog = (id) => {
        
        axios.delete(`${SERVER_URL}/delete/${id}`)
        .then(deletePost => {
            //console.log(deletePost);
            this.showMassege_deletePost();
            this.setState({
                posts: this.state.posts.filter(post => {
                  //console.log(post);
                  return post._id !== id;
                })
              });
        })
        .catch(err => {
            console.log(err);
        });
    }

    render() {
        const entityMap = {
            type: "LINK",
            mutability: "MUTABLE"
        };
        const blocks = this.props.content.blocks;
        const content = {
            blocks,
            entityMap
        }
        const text = this.getText();
        //console.log(this.state.content);
         
        const id = this.props.id;

        const editorS = EditorState.createWithContent(convertFromRaw(content));
        return (
            <div className="blogbtn" key={this.props._id}>
                <div id="mydiv">
                    <span className="post_title"><b>{this.props.title}</b></span>
                    <span className="post_catagory">{this.props.catagory}</span> <br /> <br />
                    <div className="post_content">
                        {text != null && text.length > 250 ?
                            (
                                <span className>
                                    {`${text.substring(0, 250)}...`}
                                </span>
                            ) :
                            <span>{text}...</span>
                        }
                        <Modal trigger={<a class="menu_links" href="/#"> Read More</a>} className="mymodel">
                            <Modal.Header className="blogname">{this.props.title}</Modal.Header>
                            <Modal.Content image>
                                <Modal.Description className="mycontent"> 
                                <Editor editorState={editorS} readOnly={true} />
                                <h2>Comments:</h2>
                                <Editor 
                                    editorState={this.state.editorState}
                                    plugins={[emojiPlugin, inlineToolbarPlugin]}
                                    onChange={this.onChange}
                                    ref={element => {
                                        this.editor = element;
                                    }} 
                                />
                                <EmojiSuggestions />
                                <hr/>
                                <Button
                                    type="submit"
                                    active
                                    onClick={this.onSaveComment}
                                >
                                    Comment
                                </Button>
                                <br/>
                                <br/>
                                <Comments post_id={this.props.post_id}></Comments>
                                </Modal.Description>
                            </Modal.Content>
                        </Modal>
                        <div className="credit"><br/>Written By :- <Link to={'/profile/viewprofile/' + id} ><span className="credit_span">{this.props.user_name}</span></Link></div>
                    </div>
                    {
                        this.props.current_user === this.state.user_id ? <button class="btn" onClick={() => this.DeleteBlog(this.props.post_id)}><i class="fa fa-trash"></i> Delete</button> : null
                    }
                    <br />
                </div>
            </div>
        );
    }
}

export default Bolgcomponent;
