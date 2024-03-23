//import react
import React, { Component } from 'react'
//import axios
import axios from 'axios'

import { Link } from 'react-router-dom';

//import styles
import './NoteStyle.css';




export default class ViewAllNotes extends Component {

//initialize constructor to pass the props
constructor (props) {
    super(props);
    this.state={
      //initializing an array 
      GetAllNotes:[],
   
    };
  }


 //calling the method after componenets render to the page
 componentDidMount(){
    this.retrieveNoteDetalis();
  }

 //get request method
 retrieveNoteDetalis(){
    axios.get("http://localhost:8000/GetAllNotes").then(res=>{
      // console.log(res.data);
      
    //if the request success, store the data to the array 
      if(res.data.success){
        this.setState({
          GetAllNotes:res.data.existingData
        });
             
        
       }
    })
    .catch(error => {
      console.error('Error retrieving Notes:', error);
  });

}


 //delete function

 onDelete = (id)=>{
  axios.delete(`http://localhost:8000/DeleteNote/${id}`).then((res)=>{
    this.retrieveNoteDetalis();
    alert("Deleted succesfully");
  })
  

  .catch(error => {
    console.error('Error deleting Note:', error);
});
} 

handleFilterChange = (e) => {
  this.setState({ filterOption: e.target.value });
};

//search data according to the topic

filterData(GetAllNotes,searchKey){
  const result =this.state.GetAllNotes.filter((NoteData) =>
  (NoteData.Shift?.toLowerCase() || '').includes(searchKey) ||
  (NoteData.Shift && NoteData.Shift.includes(searchKey))||
  NoteData.Topic.toLowerCase().includes(searchKey) 
  
  )

this.setState({GetAllNotes:result})

}

handleSearchArea=(e)=>{

  const searchKey = e.currentTarget.value;
  
  axios.get("http://localhost:8000/GetAllNotes").then(res=>{
  if(res.data.success){
  
    this.filterData(res.data.existingData,searchKey)
  }
});

}




  render() {


    return (

            <div>
                
                

                <center>

                <div className='content1' >


                  <div >
                    <h1 className='Header1'>My Notes List</h1> 
                  </div>
                  <br/>

                  {/* search bar */}
                  <div className='row justify-content-center'>
                      <div className="col-lg-3 my-2 mb-2" style={{width:'350px'}} >
                      <input
                      className="form-control" 
                      type="search"
                      placeholder="Search Here..."
                      name="searchQuery"
                      onChange={this.handleSearchArea}>
                      </input>
                      </div>

                  </div>

                  {/* render to create Note page  */}
                  <Link to="/AddNote" > 
                  <button className="btn btn-success" id="createbtn" style={{width:'70px', height:'30px'}}>
                  <i className="fa-solid fa-plus"></i> Create
                  </button>
                  </Link>

                  <t/>  <t/>

                
                  

                 <br/><br/>
                 
                      
                      
              {/* display Note list  */}
              <table className="center-table"  >
                  <thead >
                    <tr  >
                        <th style={{width:'40px', textAlign:'center'}} >No</th>
                        <th style={{width:'20px'}} > </th>
                        <th style={{width:'250px', textAlign:'center'}}>Note Title</th>
                        <th style={{width:'20px'}} > </th>  
                        <th style={{width:'150px', textAlign:'center'}}>Date</th>   
                            
                    </tr>
                  </thead>
                  
                  <tbody>

                    {this.state.GetAllNotes.map((GetAllNotes,index)=>(
                    <tr key ={index} >
                        <th scope='row' style={{textAlign:'center'}}> {index+1}</th>
                        <td >
                            {GetAllNotes.Topic} </td> 
                        <th style={{width:'20px'}} > </th>

                        <td>{GetAllNotes.Date}</td>

                         <th style={{width:'20px'}} > </th>
                        <td>
                          {/* render to edit page  */}
                          <Link to={`/UpdateNote/${GetAllNotes._id}`} className="btn btn-warning">
                              <i className="fas fa-edit"></i>
                          </Link>
                            &nbsp;

                            {/* delete a Note  */}
                            <a className ="btn btn-danger" href="" onClick={()=>this.onDelete(GetAllNotes._id)}>
                            <i className ="far fa-trash-alt"> </i>
                            </a>  &nbsp;
                        </td>
                    </tr>

                    
                    
                        ))} 

                                             
                  </tbody>
                  
              </table>

          
           </div>
        </center>

      </div>

    )
  }
}
