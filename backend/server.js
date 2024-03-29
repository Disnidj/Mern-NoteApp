// Import dependencies

//import express to invoke with the app
const express = require("express");

// import cors to disable the cors policy error
const cors = require("cors");

//import body-paser to convert json format data in to server objects
const bodyParser = require("body-parser");

//import mongoose
const mongoose = require("mongoose");

// import dotenv
const dotenv = require("dotenv");


//load environmental variables
dotenv.config();


// Initialize Express app
const app = express();


//middlewares
app.use(
  cors({
    origin: "*",
  })
);

// Configure body-parser middleware
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(bodyParser.json()); // Parse JSON bodies


// Log incoming request bodies
app.use((req, res, next) => {
  console.log('Received request body:', req.body);
  next();
});

// Import and use router
const router = require('./Routes/Note');


//route middleware
app.use(router);



//connect the app with mongo db with mongoose
mongoose
  .connect(process.env.DB_URL, {
    //type warnings
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  .then(() => {
    console.log("Mongo DB connected successfully");
  })

  .catch((err) => console.log("DB connection failed", err));



//declare the port to run the backend
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Backend App is running on ${PORT}`);
});
