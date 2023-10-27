require('dotenv').config();
const express = require('express'); 
const cors = require('cors');
const Note = require('./models/note'); 

const app = express();  
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.static('dist'));
app.use(cors());

let notes = [
    {
        id : 1,
        content : " HTML is easy ",
        important : true
    },
    {
        id : 2,
        content : " Browser can execute only Javascript ",
        important : false
    },
    {
        id : 3,
        content : " GET and POST are the most important methods of HTTP protocol",
        important : true
    }
]; 

app.get('/',(request,response) => {
    response.send('<h1>Hellow World</h1>')
}); 

app.get('/api/notes',(request,response) => {
    Note.find({}).then((notes)=>{
        response.json(notes);
    })
})

app.get('/api/notes/:id',(request,response) => {
    Note.findById(request.params.id).then((note)=>{
        if(note){
            response.json(note); 
        } else {
            response.status(404).end(); 
        }
    }).catch(error=>{
        console.error(error); 
        response.status(400).send({error : 'malformated Id'});
    });
})

app.delete('/api/notes/:id',(request,response) => {
    const id = Number(request.params.id); 
    const note = notes.filter( note => note.id !== id); 
    response.status(204).end();
})

app.post('/api/notes',(request,response) => {
    const body = request.body; 
    if(body.content === undefined){
        return response.status(400).json({
            error : "content missing"
        })
    }

    const note = new Note({
        content : body.content,
        important : body.important || false ,
    })
    
    note.save().then((savedNote)=>{
        response.json(savedNote);
    });
})

app.listen(PORT,() =>{
    console.log(`Server running on ${PORT}`); 
}); 
