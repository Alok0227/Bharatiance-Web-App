const mongoose = require('mongoose');
// Mongoose is an framework which helps to connect the Node.js and MongoDB platform.

// Following is an MongoDB URL which is configured on Local Machine.
const mongoURI = "mongodb://localhost:27017/system?directConnection=true&tls=false&readPreference=primary";

// Function which is used to connect the MongoDB.
const connectTOmongo = ()=>{
    mongoose.connect(mongoURI, ()=>{
        console.log("Welcome in MongoDB Connection");
    })
}

// Exporting the functional Component.
module.exports = connectTOmongo;
