import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {  convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import React from 'react'
import { useState } from "react";
export default function NewsEdit(props) {
    const [editorState,setEditorState] = useState("")
  return (
    <div>
        <Editor
    editorState={editorState}
    toolbarClassName="toolbarClassName"
    wrapperClassName="wrapperClassName"
    editorClassName="editorClassName"
    onEditorStateChange={(editorState) => {setEditorState(editorState)}}
    onBlur={() => { 
      
        props.editValue(draftToHtml(convertToRaw(editorState.getCurrentContent())))
    }}
  /></div>
  )
}
