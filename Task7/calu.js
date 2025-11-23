const express = require('express');
const app = express();

app.get('/calc', (req, res) => {
    const { num1, num2, op } = req.query;

    if (!num1 || !num2 || !op) {
        return res.json({ error: 'Missing any required query parameters.' });
    }

    const number1 = Number(num1);
    const number2 = Number(num2);

    let result;

    switch (op) {
        case 'add':
            result = number1 + number2;
            break;
        case 'sub':
            result = number1 - number2;
            break;
        case 'mul':
            result = number1 * number2;
            break;
        case 'div':
            if (number2 === 0) return res.json({ error: 'Cannot divide by zero.' });
            result = number1 / number2;
            break;
        
    }

    res.json({ result });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
