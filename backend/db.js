// DATABASE CONNECTION 
const mongoose = require('mongoose'); //IMPORT OF MONGOOSE

const mongoURI = "mongodb://127.0.0.1:27017/?readPreference=primary"   //CONNECTION STRING TO CONNECT TO DATABASE

mongoose.set('strictQuery', false);

// FUNCTION THAT SHOW THE CONNECTION IS SUCCESSFULL OR NOT 
const connectToMongo = () => {
    mongoose.connect(mongoURI, () => {
        console.log("Connected to Mongodb Successfully");
    })
};

module.exports = connectToMongo ;
