import React, { Component } from "react";
import { EditorState, convertToRaw } from "draft-js";
import createEmojiPlugin from "draft-js-emoji-plugin";
import Editor from "draft-js-plugins-editor";
import {
    ItalicButton,
    BoldButton,
    UnderlineButton,
    HeadlineOneButton,
    HeadlineTwoButton,
    HeadlineThreeButton
} from "draft-js-buttons";
import createInlineToolbarPlugin, {
    Separator
} from "draft-js-inline-toolbar-plugin";

import "draft-js-emoji-plugin/lib/plugin.css";
import "draft-js-inline-toolbar-plugin/lib/plugin.css";
import "./style.scss";

import axios from "axios";

import { SERVER_URL } from "../../utils/constants";
import { Button } from "semantic-ui-react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const emojiPlugin = createEmojiPlugin();
const { EmojiSuggestions } = emojiPlugin;

const inlineToolbarPlugin = createInlineToolbarPlugin();
const { InlineToolbar } = inlineToolbarPlugin;

class HeadlinesPicker extends Component {
    componentDidMount() {
        setTimeout(() => {
            window.addEventListener("click", this.onWindowClick);
        });
    }

    componentWillUnmount() {
        window.removeEventListener("click", this.onWindowClick);
    }

    onWindowClick = () =>
        // Call `onOverrideContent` again with `undefined`
        // so the toolbar can show its regular content again.
        this.props.onOverrideContent(undefined);

    render() {
        const buttons = [HeadlineOneButton, HeadlineTwoButton, HeadlineThreeButton];
        return (
            <div>
                {buttons.map((
                    Button,
                    i // eslint-disable-next-line
                ) => (
                        <Button key={i} {...this.props} />
                    ))}
            </div>
        );
    }
}

class HeadlinesButton extends Component {
    // When using a click event inside overridden content, mouse down
    // events needs to be prevented so the focus stays in the editor
    // and the toolbar remains visible  onMouseDown = (event) => event.preventDefault()
    onMouseDown = event => event.preventDefault();

    onClick = () =>
        // A button can call `onOverrideContent` to replace the content
        // of the toolbar. This can be useful for displaying sub
        // menus or requesting additional information from the user.
        this.props.onOverrideContent(HeadlinesPicker);

    render() {
        return (
            <div onMouseDown={this.onMouseDown} className="headlineButtonWrapper">
                <button onClick={this.onClick} className="headlineButton">
                    H
        </button>
            </div>
        );
    }
}

class App extends Component {
    constructor() {
        super();
        this.state = {
            title: "",
            catagory: "",
            user_id: "",
            user_name: "",
            editorState: EditorState.createEmpty()
        };
        this.showMassege = this.showMassege.bind(this);
    }

    showMassege = (e) => { 
        toast('Blog created successfully', {position: toast.POSITION.BOTTOM_CENTER});
    }
    showMassege_error1 = (e) => { 
        toast.error('Empty Title is not Allowed', {position: toast.POSITION.BOTTOM_CENTER});
    }
    showMassege_error2 = (e) => { 
        toast.error('Empty blog is not Allowed', {position: toast.POSITION.BOTTOM_CENTER});
    }

    onChange = editorState => {
        const contentState = editorState.getCurrentContent();
        this.saveContent(contentState);
        this.setState({
            editorState
        });
    };

    onTitleUpdate = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    getCatagory = () => {
        var sel = document.getElementById('scripts');
        for (var i = 0, len = sel.options.length; i < len; i++) {
            var opt = sel.options[i];
            if (opt.selected === true) {
                break;
            }
        }
        return opt.value;
    }

    getUserName = () => {
        const id = localStorage.getItem("token");
        const user_name = localStorage.getItem(id);
        return user_name;
    }

    onSavePost = () => {
        const catagory = this.getCatagory();
        const user_name = this.getUserName();
        const { title, editorState } = this.state;
        const post = {
            title,
            catagory,
            user_name,
            user_id: localStorage.getItem("token"),
            editorState: convertToRaw(editorState.getCurrentContent()),
        };
        
        const blog_text = convertToRaw(editorState.getCurrentContent()).blocks[0].text;
        
        if(post.title.length === 0){
            this.showMassege_error1();
        }
        else if(blog_text.length === 0){
            this.showMassege_error2();
        }
        else{
            axios.post(`${SERVER_URL}/posts/`, post)
                .then(savePost => {
                    this.showMassege();
                })
                .catch(err => {
                    console.log(err);
                });
        }
        this.setState({
            editorState: EditorState.createEmpty(),
            title: "",
            catagory: "",
            user_name:"",
            user_id: "",
        });
        window.localStorage.removeItem("content");
    };

    saveContent = content => {
        window.localStorage.setItem(
            "content",
            JSON.stringify(convertToRaw(content))
        );
    };

    render() {
        return (
            <>
                <div className="editor--playground">
                    <input
                        type="text"
                        className="title"
                        value={this.state.title}
                        name="title"
                        placeholder="Title of the post..."
                        onChange={this.onTitleUpdate}
                    />
                    <Editor
                        placeholder="Post..."
                        editorState={this.state.editorState}
                        plugins={[emojiPlugin, inlineToolbarPlugin]}
                        onChange={this.onChange}
                        ref={element => {
                            this.editor = element;
                        }}
                    />
                    <EmojiSuggestions />
                    <InlineToolbar>
                        {// may be use React.Fragment instead of div to improve perfomance after React 16
                            externalProps => (
                                <div>
                                    <BoldButton {...externalProps} />
                                    <ItalicButton {...externalProps} />
                                    <UnderlineButton {...externalProps} />
                                    <Separator {...externalProps} />
                                    <HeadlinesButton {...externalProps} />
                                </div>
                            )}
                    </InlineToolbar>
                </div>
                <div>
                    <select id="scripts">
                        <option value="technical" selected>Technical Blog</option>
                        <option value="non-technical">Non-Technical Blog</option>
                        <option value="interview-experience">Interview Experience</option>
                        <option value="research">Research Blog</option>
                    </select>
                    <Button
                        type="submit"
                        active
                        onClick={this.onSavePost}
                        style={{ marginLeft: "5%" }}
                    >
                        Post it...
                    </Button>
                </div>
            </>
        );
    }
}

export default App;
