//import mongoose
const mongoose=require("mongoose");

//make a db schema to store note  data

const NoteSchema = new mongoose.Schema({

    Date:{
        type:String,
        required:true,
    },

    Topic:{
        type:String,
        required:true,
    },

    Description:{
        type:String,
        required:true,
        
    },

    starred: {
        type: Boolean,
        default: false 
    }


   
});

//pass the schema
module.exports=mongoose.model("Note",NoteSchema);