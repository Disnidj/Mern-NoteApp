import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { EditorState, convertFromRaw } from 'draft-js';
import { convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html'; // Import draftjs-to-html
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
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
        const contentState = convertFromRaw(JSON.parse(res.data.oneNote.Description));
        const editorState = EditorState.createWithContent(contentState);
        setDescription(editorState);
      })
      .catch(err => console.log(err));
  }, [id]);

  // Function to convert Draft.js content to HTML
  const draftToHtmlContent = () => {
    const contentState = Description.getCurrentContent();
    const htmlContent = draftToHtml(convertToRaw(contentState));
    return { __html: htmlContent };
  };

  return (
    <div>
      
      <center>
        <div className='content3'>
          
          
          <div className="note-details">

            <br/>
            <h5 style={{ textAlign:'right' }}><strong>Date:</strong> {Date}</h5>

            
            <h1 style={{ color: "white", textShadow: '1px 2px 5px black', marginTop: '-10px' }}><strong>{Topic}</strong> </h1> <br/>
            
            <div dangerouslySetInnerHTML={draftToHtmlContent()} style={{ overflowY: 'auto',backgroundColor: 'rgb(247, 246, 246)', borderRadius:'10px', minHeight: '360px', maxHeight:'360px'}}/>
            

          </div>
          
            
          <center>
            <br/>
            <Link to="/">
              <button type='button' className="btn btn-info" style={{ width: "160px" }}>
                <i className="fa-solid fa-chevron-left"></i>&nbsp; HOME
              </button>
            </Link>
          </center>
        </div>
        </center>
      
    </div>
  )
}

export default ViewNote;
