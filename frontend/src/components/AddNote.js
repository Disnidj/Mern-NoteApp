//import dependancies
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

//import stylings
import './NoteStyle.css';

const AddNote = () => {
  const navigate = useNavigate();
  const [Date, setDate] = useState("");
  const [Topic, setTopic] = useState("");
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  useEffect(() => {
    return () => {
      // Cleanup function to handle component unmount
      
    };
  }, []);
 

  //handle the input data changes

  const handle_Date_Change = (e) => {
    setDate(e.target.value)
  }

  const handle_Topic_Change = (e) => {
    e.preventDefault();
    setTopic(e.target.value)
  }

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };


  //handle form submissions
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Date === '' || Topic === '' || !editorState.getCurrentContent().hasText()) { // Updated condition
      alert("Fill The Required Fields!!");
    }  else if (Topic.length > 20) {
      alert('Topic should not exceed 20 characters.');
    } else {
      const description = JSON.stringify(convertToRaw(editorState.getCurrentContent()));

      try {
        await axios.post('http://localhost:8000/Note/Save', {
          Date: Date,
          Topic: Topic,
          Description: description
        });

        alert("Data saved successfully!");
        navigate('/');
      } catch (error) {
        alert("Data saving unsuccessful");
        console.error(error);
      }
    }
  };

  const resetInputField = () => {
    setDate("");
    setTopic("");
    setEditorState(EditorState.createEmpty());
  };



  return (
    <div>
      <center>
        <div className='content2'>

          <br/>
          <center><h1 style={{ color: "white", textShadow: '1px 2px 5px black' }}>Create Your Note! </h1></center>
          <br />

          <form onSubmit={(e) => handleSubmit(e)} className='Add_form'>
            <div>
            <div className='row justify-content-center'>
                <div className='form-group col-md-6'>
                  
                  <input
                    type='text'
                    value={Topic}
                    placeholder="Type Your Note Topic Here"
                    className='form-control'
                    style={{ marginBottom: '20px' }}
                    onChange={(e) => handle_Topic_Change(e)}
                    required />
                </div>

                <div className='form-group col-md-6'>
                  <input
                    type='datetime-local'
                    value={Date}
                    name="DateTime"
                    placeholder='Date'
                    className='form-control'
                    style={{ marginBottom: '20px' }}
                    onChange={(e) => handle_Date_Change(e)}
                    required />
                </div>

              </div>

              <div className='form-group' id='textarea'>
                <Editor
                  editorState={editorState}
                  toolbar={{
                    options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'emoji', 'remove', 'history'],
                    inline: { options: ['bold', 'italic', 'underline', 'strikethrough'] },
                    list: { options: ['unordered', 'ordered'] },
                    textAlign: { options: ['left', 'center', 'right', 'justify'] },
                  }}
                  wrapperClassName="wrapperClassName"
                  editorClassName="editorClassName"
                  onEditorStateChange={onEditorStateChange}
                  toolbarClassName="toolbarClassName"
                  editorStyle={{ minHeight: '260px', maxHeight:'260px', backgroundColor:'white', overflowY: 'auto' }}
                  required
                  
                />
              </div>
              
              <br/>

              <Link to="/">
                <button type='button' className="btn btn-info" style={{ marginRight: " 20px" }}>
                  <i className="fa-solid fa-chevron-left"></i>&nbsp; HOME
                </button>
              </Link>

              <button type='submit' className='btn btn-success' style={{ marginRight: " 10px" }} >
                <i className="fa-solid fa-circle-check"></i>&nbsp; SUBMIT
              </button>
              
              <button className="btn btn-warning" onClick={resetInputField} style={{ marginLeft: " 10px" }} >
                <i className="fa-solid fa-broom"></i>&nbsp; CLEAR
              </button>

            </div>
          </form>
        </div>
      </center>
    </div>
  );
}

export default AddNote;
