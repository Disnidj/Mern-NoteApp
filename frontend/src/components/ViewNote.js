import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { Editor, EditorState, convertFromRaw } from 'draft-js';
import 'draft-js/dist/Draft.css';
import './NoteStyle.css';

function ViewNote() {
  const [Date, setDate] = useState("");
  const [Topic, setTopic] = useState("");
  const [Description, setDescription] = useState(EditorState.createEmpty());

  const id = useParams();

  useEffect(() => {
    axios.get(`http://localhost:8000/GetOneNote/${id?.id}`)
      .then(res => {
        setDate(res.data.oneNote.Date);
        setTopic(res.data.oneNote.Topic);
        setDescription(
          EditorState.createWithContent(convertFromRaw(JSON.parse(res.data.oneNote.Description)))
        );
      })
      .catch(err => console.log(err));
  }, [id]);

  return (
    <div>
      <center>
        <div className='content3'>
          <center>
            <h2 style={{ color: "white", textShadow: '1px 2px 5px black', marginTop: '40px' }}>Note View</h2>
          </center>
          <br /><br />
          <div className="note-details" style={{ color: 'white' }}>
            <p style={{ marginLeft: '400px' }}><strong>Date:</strong> {Date}</p>
            <h2><strong>{Topic}</strong> </h2>
            <div className="description-editor">
              <Editor editorState={Description} readOnly={true} />
            </div>
          </div>
          <Link to="/">
            <button type='button' className="btn btn-info" style={{ bottom: '70px', width: "110px", position: 'fixed' }}>
              <i className="fa-solid fa-chevron-left"></i>&nbsp; HOME
            </button>
          </Link>
          <br /><br /><br />
        </div>
      </center>
    </div>
  )
}

export default ViewNote;
