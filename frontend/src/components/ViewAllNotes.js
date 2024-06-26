//import dependancies
import React, { Component } from 'react'
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
      filterOption: 'all' // default filter option
   
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

filterData(GetAllNotes, searchKey) {
  const lowerSearchKey = searchKey.toLowerCase(); // Convert search key to lowercase
  const upperSearchKey = searchKey.toUpperCase(); // Convert search key to uppercase

  const result = this.state.GetAllNotes.filter((NoteData) =>
    (NoteData.Shift?.toLowerCase() || '').includes(lowerSearchKey) || // Include lowercase match
    (NoteData.Shift && NoteData.Shift.includes(upperSearchKey)) || // Include uppercase match
    NoteData.Topic.toLowerCase().includes(lowerSearchKey) // Include lowercase match
  );

  this.setState({ GetAllNotes: result });
}

handleSearchArea = (e) => {
  const searchKey = e.currentTarget.value;
  
  // Check if searchKey is empty
  if (searchKey.trim() === '') {
      // If empty, fetch all records again
      this.retrieveNoteDetalis();
  } else {
      // If not empty, filter data based on searchKey
      axios.get("http://localhost:8000/GetAllNotes").then(res => {
          if (res.data.success) {
              this.filterData(res.data.existingData, searchKey);
          }
      });
  }
}


handleStarredChange = (id, checked) => {
  axios.put(`http://localhost:8000/UpdateNoteStar/${id}`, { starred: checked })
      .then(() => {
          // Update local state 
          this.setState(prevState => ({
              GetAllNotes: prevState.GetAllNotes.map(GetAllNotes => {
                  if (GetAllNotes._id === id) {
                      return { ...GetAllNotes, starred: checked };
                  }
                  return GetAllNotes;
              })
          }));
      })
      .catch(error => {
          console.error('Error updating star:', error);
      });
};



  render() {

    const { GetAllNotes, filterOption } = this.state;
    let filteredNotes = GetAllNotes;
    if (filterOption === 'unchecked') {
        filteredNotes = GetAllNotes.filter(GetAllNotes => GetAllNotes.starred);
    } else if (filterOption === 'checked') {
        filteredNotes = GetAllNotes.filter(GetAllNotes => !GetAllNotes.starred);
    }

    return (

            <div>

                <center>

                <div className='content1' >

                  <div >
                    <h1 className='Header1' style={{ color: "white", textShadow: '1px 2px 5px black', marginTop: '40px' }}>My Notes List</h1> 
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

                  {/* filter option  */}
                  <div className="col-lg-3 my-2 mb-2" style={{width:'350px'}} >
                    <select className="form-select" onChange={this.handleFilterChange} defaultValue="all">
                        <option value="all">All</option>
                        <option value="checked">Starred</option>
                        <option value="unchecked">Common</option>
                    </select>
                  </div>

                  </div>

                  {/* render to create Note page  */}
                  <Link to="/AddNote" > 
                  <button className="btn btn-success" id="createbtn" style={{width:'120px', height:'40px'}}>
                  <i className="fa-solid fa-plus"></i> Create
                  </button>
                  </Link>

                  <span></span>

                  <br/><br/>
                       
                      
              {/* display Note list  */}
              <table className="center-table"  >
                  <thead >
                    <tr  >
                        <th style={{width:'40px', textAlign:'center', color:'black'}} >No</th>
                        <th style={{width:'20px'}} > </th>
                        <th style={{width:'40px',textAlign:'center', color:'black'}} >Starred</th> 
                        <th style={{width:'20px'}} > </th>
                        <th style={{width:'250px', textAlign:'center', color:'black'}}>Todo</th>
                        <th style={{width:'20px'}} > </th>  
                        <th style={{width:'150px', textAlign:'center', color:'black'}}>Date</th>   
                          
                    </tr>
                  </thead>
                  
                  <tbody>

                    {filteredNotes.map((GetAllNotes,index)=>(
                    <tr key ={index} >
                        <th scope='row' style={{textAlign:'center', color:'black'}}> {index+1}</th>
                        
                        <th style={{width:'20px'}} > </th>

                        <td style={{width:'20px'}}>
                              <input
                                  className='star'
                                  type="checkbox"
                                  checked={GetAllNotes.starred}
                                  onChange={(e) => this.handleStarredChange(GetAllNotes._id, e.target.checked)}
                              />
                              
                        </td>

                        <th style={{width:'20px'}} > </th>
                        
                        <td >
                            {GetAllNotes.Topic} </td> 
                        <th style={{width:'20px'}} > </th>

                        <td>{GetAllNotes.Date}</td>

                         <th style={{width:'20px'}} > </th>
                        <td>
                          {/* render to edit page  */}
                          <Link to={`/ViewNote/${GetAllNotes._id}`} className="btn btn-primary">
                           <i className="fa-solid fa-eye"></i>
                          </Link>
                            &nbsp;

                          {/* render to edit page  */}
                          <Link to={`/UpdateNote/${GetAllNotes._id}`} className="btn btn-warning">
                           <i className="fa-solid fa-pen-to-square"></i>
                          </Link>
                            &nbsp;

                          {/* delete a Note  */}
                          <button className="btn btn-danger" onClick={() => this.onDelete(GetAllNotes._id)}>
                            <i className="far fa-trash-alt"></i>
                          </button>
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
