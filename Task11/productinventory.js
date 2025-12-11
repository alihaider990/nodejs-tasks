const express = require('express');
const app = express();
app.use(express.json());
const mongoose = require('mongoose');

mongoose.connect(
  "mongodb+srv://alihaidergr8_db_user:alihaiderishere@cluster0.jqnbiga.mongodb.net/productdb?retryWrites=true&w=majority"
)
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.error("Failed to connect to MongoDB", err));

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    stock: { type: Number, required: true, min: 0 },
    type: { type: String, enum: ['laptop', 'airpods', 'charger'] }
});

const Product = mongoose.model("Product", productSchema);

app.post('/product', (req, res) => {
    const { name, price, stock, type } = req.body;

    if (!name || price === undefined || stock === undefined) {
        return res.status(400).json({ message: "name, price, stock are required" });
    }
    if (typeof price !== "number" || price <= 0) {
        return res.status(400).json({ message: "price must be > 0" });
    }
    if (typeof stock !== "number" || stock < 0) {
        return res.status(400).json({ message: "stock must be ≥ 0" });
    }

    Product.create({ name, price, stock, type })
    .then(product => {
        res.status(201).json(product);
    })
    .catch(err => {
        res.status(400).json({ message: err.message });
    });
});

app.get('/product', (req, res) => {
    Product.find()
    .then(products => {
        res.json(products);
    })
    .catch(err => {
        res.status(500).json({ message: err.message });
    });
});

app.delete('/product/:id', (req, res) => {
    Product.findByIdAndDelete(req.params.id)
    .then(result => {
        if (!result) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(204).send();
    })
    .catch(err => {
        res.status(500).json({ message: err.message });
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
