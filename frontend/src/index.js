import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; 

ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('app') // Make sure 'app' matches the ID of your container in the HTML
  );
