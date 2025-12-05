const express = require('express');
const app = express();

app.use(express.json());

let todos = [];
let id = 1;

app.post('/todo', (req, res) => {
    const { title, description, status } = req.body;

    if (!title) {
        return res.status(400).json({ message: "Title is required" });
    }

    if (status && status !== "pending" && status !== "completed") {
        return res.status(400).json({ message: "Status must be pending or completed" });
    }

    const todo = {
        id: id++,
        title,
        description,
        status: status || "pending"
    };
    todos.push(todo);

    res.status(201).json({
        status: "success",
        todos: []
    });
});

app.get('/todo', (req, res) => {
    res.json({
        status: "success",
        todos: todos
    });
});

app.get('/todo/:id', (req, res) => {
    const todo = todos.find(t => t.id == req.params.id);

    if (!todo) {
        return res.status(404).json({ message: "Todo not found" });
    }
    res.json(todo);
});

app.put('/todo/:id', (req, res) => {
    const todo = todos.find(t => t.id == req.params.id);

    if (!todo) {
        return res.status(404).json({ message: "Todo not found" });
    }

    const { title, description, status } = req.body;

    if (status && status !== "pending" && status !== "completed") {
        return res.status(400).json({ message: "Status must be pending or completed" });
    }

    if (title) todo.title = title;
    if (description) todo.description = description;
    if (status) todo.status = status;

    res.json(todo);
});

app.delete('/todo/:id', (req, res) => {
    const index = todos.findIndex(t => t.id == req.params.id);

    if (index === -1) {
        return res.status(404).json({ message: "Todo not found" });
    }

    todos.splice(index, 1);

    
    res.json({
        status: "success",
        message: "Todo deleted"
    });
});

app.listen(3000, () => {
    console.log("Server is running");
});
