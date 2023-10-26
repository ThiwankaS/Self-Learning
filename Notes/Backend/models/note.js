require('dotenv').config();
const mongoose = require('mongoose'); 

const url = process.env.MONGODB_URL; 

mongoose.set('strictQuery',false); 
console.log(`connecting to DB.....`); 
mongoose.connect(url).then((result)=>{
    console.log(`connection sucessful!`); 
}).catch((error)=>{
    console.log(`connection error`,error.message);
});

const noteSchema = new mongoose.Schema({
    content : String,
    important : Boolean,
})

noteSchema.set('toJSON',{
    transform : (document,returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id; 
        delete returnedObject.__v; 
    }
})

module.exports = mongoose.model('Note',noteSchema);