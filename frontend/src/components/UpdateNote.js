import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './NoteStyle.css';

function UpdateNote() {
  const [Date, setDate] = useState('');
  const [Topic, setTopic] = useState('');
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const id = useParams();

  useEffect(() => {
    axios.get(`http://localhost:8000/GetOneNote/${id?.id}`)
      .then(res => {
        setDate(res.data.oneNote.Date);
        setTopic(res.data.oneNote.Topic);
        const contentState = convertFromRaw(JSON.parse(res.data.oneNote.Description));
        const editorState = EditorState.createWithContent(contentState);
        setEditorState(editorState);
      })
      .catch(err => console.log(err));
  }, [id]);

  const handle_Topic_Change = (e) => {
    e.preventDefault();
    setTopic(e.target.value);
    if (e.target.value.length > 20) {
      alert("Limit Exceeded!");
    }
  };

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  const ChangeOnClick = async (e) => {
    e.preventDefault();
    const description = JSON.stringify(convertToRaw(editorState.getCurrentContent()));

    const updatedNote = {
      Date,
      Topic,
      Description: description,
    };

    await axios.put(`http://localhost:8000/UpdateNote/${id?.id}`, updatedNote)
      .then(res => {
        alert("Update Success!!");
      })
      .catch(err => {
        alert("Update Failed!!");
        console.log(err);
      });
  };

  function refreshPage() {
    window.location.reload(false);
  }

  return (
    <div>
      <center>
        <div className='content3'>
          <center>
            <h2 style={{ color: "white", textShadow: '1px 2px 5px black', marginTop: '40px' }}>Note Update</h2>
          </center>
          <br /><br />
          <form className='Add_form'>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="Topic"
                onChange={(e) => handle_Topic_Change(e)}
                value={Topic}
                required='true'
              />
            </div>
            <br />
            <div className="form-group">
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
                editorStyle={{ minHeight: '200px', backgroundColor:'white' }}
                
              />
            </div>
            <br />
            <div className="form-group">
              <input
                type="datetime-local"
                className="form-control"
                name="DateTime"
                value={Date}
                readOnly
              />
            </div>
            <br />
          </form>
          <Link to="/">
            <button type='button' className="btn btn-info" style={{ marginRight: " 20px", width: "110px" }}>
              <i className="fa-solid fa-chevron-left"></i>&nbsp; HOME
            </button>
          </Link>
          <button className="btn btn-secondary" type="submit" style={{ width: "110px", marginRight: "10px", backgroundColor: "#484846" }} onClick={(e) => ChangeOnClick(e)}>
            <i className="fa-solid fa-pen-to-square"></i>&nbsp; UPDATE
          </button>
          <button className="btn btn-warning" style={{ width: "110px", marginLeft: "10px" }} onClick={refreshPage}>
            <i className="fa-solid fa-arrow-rotate-right"></i>&nbsp;Refresh
          </button>
          <br /><br /><br />
        </div>
      </center>
    </div>
  )
}

export default UpdateNote;
