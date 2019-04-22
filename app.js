const express = require('express'); 
const dotenv = require('dotenv').config();

const app = express(); 
app.use(express.static('public'));


const PORT = process.env.PORT || 5000; 

app.get('/', (req, res) =>{
    res.status(200).send({
        success: true, 
        message: 'Your request was accepted', 
        location: 'Home directory'
    });
});

app.listen(PORT, () =>{
    console.log(`Application running on port ${PORT}.`);
});