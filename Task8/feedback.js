const express = require('express');
const app = express();

let feedback = [];
app.use(express.json());




app.post('/feedback', (req, res) => {
    
    let name = req.body.name;
    let message = req.body.message;


    if (!name || !message) {
        return res.json({
            status: "error",
            message: "name and message are required"
        });
    }

    
    feedback.push({ name, message });
  
    return res.json({
        status: "success",
        data: {
            name: "ali",
            message: "this course is amazing!"
        }
    });
});
app.get('/feedback', (req, res) => {
    return res.json(feedback);
});
app.listen(4000, () => {
    console.log('Server is running on port 4000');
});
