import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './NoteStyle.css'


const AddNote = () => {

    //to navigate to anohter page or the same page
    const navigate=useNavigate();

    //use state to track state in function components
    const [Date, setDate]=useState("");
    const [Topic, setTopic]=useState("");
    const [Description, setDescription]=useState("");
    
 


    //handle the input data 
    const handle_Date_Change=(e)=>{
      
      setDate(e.target.value)

    }

   
    const handle_Topic_Change=(e)=>{
      e.preventDefault();
      setTopic(e.target.value)
    }

    const handle_Description_Change=(e)=>{
      e.preventDefault();
      setDescription(e.target.value)
    }



    // clear all input values
      const resetInputField = () => {
        setDate("");
        setTopic("");
        setDescription("");
       
      };
   

      //handle the submit data
      const handleSubmit = async (e)=>{
      e.preventDefault();

      if(Date===''|| Topic==='' || Description===''){
        alert("Fill The Required Fields!!")

      }else {

        let newNote={
          Date:Date,
          Topic:Topic,
          Description:Description
        }

        

        let data= await axios.post('http://localhost:8000/Note/Save',{
        
          Date:Date,
          Topic:Topic,
          Description:Description
          
        });

        

        // console.log("Saved Data : ",data);

        if(data.status !== 200){
          alert("Data Saving Unsuccessfull")
        }
        else{
      
          alert("You Are Saving The Data")
          navigate('/')
        }

      }

  
    }


  return (
        <div>

            <center>

              <div className='content2'>
                  
                  <center><h2 style={{color:"white",textShadow: '1px 2px 5px black', marginTop:'40px'}}>Create Your Note! </h2></center>
                  <br/><br/>

                  {/* Create notes page display here  */}
                  <form onSubmit={(e) => handleSubmit(e)} className='Add_form' >

                  <div>
              
                        <div className='form-group' >
                        
                            <input 
                            type='text' 
                            value={Topic} 
                            placeholder="Type Your Note Topic Here"
                            className='form-control' 
                            style={{ marginBottom: '20px' }} 
                            onChange={(e) => handle_Topic_Change(e)} 
                            required='true' />
                            
                        </div>
                    
                        <div className='form-group'>
                            
                              <textarea   
                              value={Description} 
                              placeholder="Type a Description Here"
                              className='form-control' 
                              style={{ marginBottom: '20px' , height:'160px'}} 
                              onChange={(e) => handle_Description_Change(e)} 
                               />
                        </div>

                        <div className='form-group'>
                              <input 
                              type='datetime-local' 
                              value={Date} 
                              name="DateTime"
                              placeholder='Date'
                              className='form-control' 
                              style={{ marginBottom: '20px' }} 
                              onChange={(e) => handle_Date_Change(e)} 
                              required='true' />
                        </div>
                        
                        <br/>   
                        
                     {/* go back  */}
                        <Link to="/">
                        <button type='button' className="btn btn-info" style={{marginRight:" 20px"}}> 
                        <i className="fa-solid fa-chevron-left"></i>&nbsp; HOME</button>
                        </Link>

                     {/* save the note  */}
                        <button type='submit' className='btn btn-success' style={{marginRight:" 10px"}} > 
                        <i className="fa-solid fa-circle-check"></i>&nbsp; SUBMIT</button>

                      {/* clear the form    */}
                        <button className="btn btn-warning" onClick={resetInputField} style={{marginLeft:" 10px"}}> 
                        <i className="fa-solid fa-broom"></i>&nbsp; CLEAR</button>
                        
                     
                  </div>
              </form>
                
            </div>
                
          

          </center>

    </div>
  )
}

export default AddNote