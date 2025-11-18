const express = require('express');
const app = express();

app.get('/welcome', (req, res) => {
    res.send('Welcome to my first api');
});

app.get('/greet', (req, res) => {
    const name = req.query.name;
    if (name){
        res.json({
            "message" : `Hello, ${name}!`
        });
    }
    else {
        res.json({
            "message": "Hello, Guest!"
        });
    }
});

app.get('/student/:name', (req, res) => {
    const Studentname = req.params.name;
    res.json({
        "student": Studentname,
        "status": "task fetched"
    });
})


app.get('/', (req, res) => {
    res.send('[{"message": "Hello ali!!"}]'); 
});


app.listen(5000, () => {
    console.log('Server is running on port 5000');
});