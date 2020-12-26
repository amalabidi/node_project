const express = require('express');
const mongoose = require('mongoose');
const users = require('./routes/users');
const app = express();

app.use(express.json());


// connecting to mongodb


/*'mongodb+srv://flutter-team:flutter-junior@cluster0.o7rlv.mongodb.net/flutter_ecommerce_project' */
const DB_USER = process.env.DB_USER ;
const DB_PASSWORD = process.env.DB_PASSWORD; 
mongoose.connect( `mongodb+srv://amalabidi:amal123456789@cluster0.g1qvx.mongodb.net/test`,{ useNewUrlParser: true , useUnifiedTopology: true})
    .then(() => console.log("connected to mongodb successfully"))
    .catch((err) => console.log('couldnt connect to mongodb' + err));


//delegating a router to a given url
// all request to /api/categories will be handled by the categories router

app.use("/users", users);
//choose the backend port 
  const port = process.env.PORT || 3001;

//starting the backend server
app.listen(port, () => console.log("listening on port:" + port));





