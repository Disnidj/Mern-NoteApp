import React, { Profiler, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ViewAllNotes from "./components/ViewAllNotes";



export default function TodoRouter() {
  return (
    <div>
      <Router>
        
        <Routes>
          

          <Route path="/" element={<ViewAllNotes />} />
          
         

        </Routes>
        
      </Router>
    </div>
  );
}
