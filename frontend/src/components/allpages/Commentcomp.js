import React, { Component } from 'react'
import './main.css';
import { Editor, convertFromRaw, EditorState } from "draft-js";
import { Link } from "react-router-dom";
import createEmojiPlugin from "draft-js-emoji-plugin";
import createInlineToolbarPlugin from "draft-js-inline-toolbar-plugin";

import "draft-js-emoji-plugin/lib/plugin.css";
import "draft-js-inline-toolbar-plugin/lib/plugin.css";

import 'react-toastify/dist/ReactToastify.css'

const emojiPlugin = createEmojiPlugin();
const { EmojiSuggestions } = emojiPlugin;

const inlineToolbarPlugin = createInlineToolbarPlugin();

export class Commentcomp extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             content : {}
        }
    }

    getText = () => {
        if (!this.props.content.blocks) return null;
        return this.props.content.blocks[0].text;
    }
    
    render() {
        const entityMap = {
            type: "LINK",
            mutability: "MUTABLE"
        };
        const imglink = localStorage.getItem(this.props.user_name);
        const blocks = this.props.content.blocks;
        const content = {
            blocks,
            entityMap
        }
        const editorState= EditorState.createWithContent(convertFromRaw(content));
        return (
            <div key={this.props._id} class="comment-box">
                 <div><Link to={'/profile/viewprofile/' + this.props.id} > <img src={imglink} className="comment_img" alt="profile"/> <b className="credit_span">{this.props.user_name}:</b></Link></div>
                 <Editor editorState={editorState} readOnly={true} plugins={[emojiPlugin, inlineToolbarPlugin]}/>
                 <EmojiSuggestions />
            </div>
        )
    }
}

export default Commentcomp
