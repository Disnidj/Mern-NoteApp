import React, { Profiler, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import AddNote from "./components/AddNote";
import ViewAllNotes from "./components/ViewAllNotes";
import UpdateNote from "./components/UpdateNote";
import ViewNote from "./components/ViewNote"


export default function NoteRouter() {
  return (
    <div>
      <Router>
        
        <Routes>
          

          <Route path="/" element={<ViewAllNotes />} />
          
          <Route
            path="/AddNote"
            element={<AddNote />}
          />
          <Route
            path="/UpdateNote/:id"
            element={<UpdateNote />}
          />

          <Route
            path="/ViewNote/:id"
            element={<ViewNote />}
          />
         

        </Routes>
        
      </Router>
    </div>
  );
}
