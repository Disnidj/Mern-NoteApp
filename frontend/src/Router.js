import React, { Profiler, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import AddNote from "./components/AddNote";
import ViewAllNotes from "./components/ViewAllNotes";
import UpdateNote from "./components/UpdateNote";


export default function TodoRouter() {
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
         

        </Routes>
        
      </Router>
    </div>
  );
}
