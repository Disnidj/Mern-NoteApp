# MERN Stack Note Application
This is a simple Note application built using the MERN stack (MongoDB, Express.js, React, Node.js).

## Features
* Display a list of notes with the ability to add, edit, view and delete tasks.
* Search option to search by the note title .
* Implement notes filtering options (e.g., All, Pending, Completed).
* Provide a star feature to mark tasks as important.

## Prerequisites
Before you begin, ensure you have met the following requirements:
* Node.js installed on your machine.
* MongoDB installed and running locally or access to a MongoDB database.

## Installation
1. Clone the repository:   
 ```git clone https://github.com/Disnidj/Mern-NoteApp.git ```

3. Navigate to the backend directory:
   ```cd MERN_Noteapp```
   -> ```cd backend```
   
5. Install server dependencies:
  ``` npm install```

6. Navigate to the frontend directory:
   ```cd MERN_Noteapp```
   -> ```cd frontend```

8. Install server dependencies:
  ``` npm install```

## Configuration
Create a .env file in the root directory:
```MONGODB_URI=your_mongodb_connection_string ```
Replace your_mongodb_connection_string with your MongoDB connection string.

## Usage
1. start backend server
   ```npm start```
2. start frontend
   ```npm start```

Open the web browser by ctrl+link(display on the frontend terminal)
     
## API Endpoints
* GET ``` /GetAllNotes``` : Get all notes.
* POST ``` /Note/Save``` : Create a new note.
* PUT ``` /UpdateNote/:id``` : Update a note.
* DELETE ``` /DeleteNote/:id``` : Delete a note.
* UPDATE2  ``` /UpdateNoteStar/:id``` : Stares update


## Technologies Used
* Front-end: React.js
* Back-end: Node.js, Express.js
* Database: MongoDB
* Other: Axios, Bootstrap, React Router

## Demo

   ```mern-noteapp.netlify.app ```
