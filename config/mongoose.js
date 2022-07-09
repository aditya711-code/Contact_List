//require the library
const mongoose = require('mongoose');
//connect to the database

mongoose.connect('mongodb://localhost:27017/contact_list_db');

//acquire the connection th check if the connections is successful
const db=mongoose.connection;
//error
db.on('error',console.error.bind(console,'Error connecting to db'));
//up and running
db.once('open',function(){
    console.log("Connected to database successfully");
});

