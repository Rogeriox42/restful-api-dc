const express = require('express'); 
const dotenv = require('dotenv').config();

const app = express(); 
app.use(express.static('public'));

var db = require('./db/database.js'); 

const PORT = process.env.PORT || 5000; 
console.log(PORT);

//Read
app.get('/api/v1/heroes', (req, res) =>{
    res.status(200).send({
        success: true, 
        message: 'Your request was accepted', 
        database: db
    });
});

app.get('/api/v1/heroes/:id', (req, res) =>{
    var id = req.params.id;
    var result; 

    for(var i = 0; i < db.length; i++){
        if(id == db[i].id){
            result = db[i];
            success = true;
            message = 'Your request was accepted';
        }
    }
    if(!result) {
        result = 'Not found';
        success = false;
        message = 'Incorrect ID';
    }

    res.status(200).send({
        'success': success, 
        'message': message, 
        hero: result
    });
});

//Create
app.put('/api/v1/heroes', (req, res) =>{
    
    var name = req.get('name'); 
    var identity = req.get('identity'); 

    var newHero = {
        id: db.length + 1,
        name: name, 
        identity: identity
    }

    db.push(newHero);

    var output = 'v1 heroes post output';
    
    res.status(200).send({
        success: true, 
        'message': 'Succesfully achieved server', 
        'data': db
    });
});

//Update 
app.post('/api/v1/heroes/:id', (req, res) =>{
    var id = req.params.id;
    var name = req.get('name'); 
    var identity = req.get('identity'); 

    for(var i = 0; i < db.length; i++){
        var hero = db[i];
        if(hero.id == id){
            hero.name = name;
            hero.identity = identity;
        }
    }

    var output = 'v1 heroes post output';
    
    res.status(200).send({
        success: true, 
        'message': 'Succesfully achieved post', 
        'data': db
    });
});

//Delete 
app.delete('/api/v1/heroes/:id', (req, res) =>{
    var id = req.params.id; 
    var message; 
    var output; 

    for(var i = 0; i < db.length; i++){
        
        if(id == db[i].id){
            db.splice(i, 1);
            
            message = `${id} was Succesfully deleted.`
            output = {message:`${message}`, 'db':db}
        }
    }

    if(!message) {
        success = false; 
        message = `${id} doesn't exist.`;
        output = {message:`${message}`}
    }
    res.status(200).send({
        success: true, 
        'data': output
    })
});


app.listen(PORT, () =>{
    console.log(`Application running on port ${PORT}.`);
});