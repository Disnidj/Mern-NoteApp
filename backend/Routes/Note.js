//import express
const express = require("express");

//import db schema
const Note =require("../Model/Note");

//give access to request function through express router
const router=express.Router();

//Create a Note
router.post("/Note/Save", async (req, res) => {
    console.log('Request body:', req.body);
    try {
        let newNote = new Note(req.body);
        await newNote.save(); // Await to wait for the save operation to complete
        return res.status(200).json({
            success: "The Note created successfully"
        });
    } catch (err) {
        console.error('Error:', err);
        return res.status(400).json({
            error: err.message // to capture the error message
        });
    }
});

//Get all Notes

router.get("/GetAllNotes", async (req, res) => {
    try {
        const allNotes = await Note.find().exec();// Await to wait for the execute operation to complete
        return res.status(200).json({
            success: true,
            existingData: allNotes
        });
    } catch (err) {
        return res.status(400).json({ // to capture the error message
            error: err
        });
    }
});


/// Get one Note
router.get("/GetOneNote/:id", async (req, res) => {
    try {
        const note = await Note.findById(req.params.id); // Await to wait for peration to complete
        if (!note) {
            return res.status(404).json({ error: "The Note not found" });
        }
        return res.status(200).json({
            success: true,
            oneNote: note
        });
    } catch (err) {
        return res.status(400).json({ // to capture the error message
            error: err
        });
    }
});



//Update a Note
router.put("/UpdateNote/:id", async (req, res) => {
    try {
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true }); // Await to wait for the operation to complete
        if (!updatedNote) {
            return res.status(404).json({ error: "The Note not found" });
        }
        return res.status(200).json({
            success: "Note Updated Successfully",
            updatedNote
        });
    } catch (err) {
        return res.status(400).json({// to capture the error message
            error: err
        });
    }
});

// Delete a Note
router.delete("/DeleteNote/:id", async (req, res) => {
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id); // Await to wait for the  operation to complete
        if (!deletedNote) {
            return res.status(404).json({ error: "Note not found" });
        }
        return res.json({
            message: "Note Deleted Successfully",
            deletedNote
        });
    } catch (err) {
        return res.status(400).json({ error: err.message }); // to capture the error message
    }
});

///Stars update

router.put("/UpdateNoteStar/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { starred } = req.body; 
        const updatedNote = await Note.findByIdAndUpdate(id, { starred }, { new: true }); 
        res.status(200).json({ success: true, note: updatedNote });
    } catch (error) {
        console.error('Error updating note star:', error);
        res.status(500).json({ success: false, error: error.message }); // to capture the error message
    }
});
  

module.exports=router;