const express = require('express');
const app = express();
app.use(express.json());


let products = [];
let orders = [];
let productId = 1;
let orderId = 1;


app.post('/product', (req, res) => {
    const { name, price, stock } = req.body;

    
    if (!name || price === undefined || stock === undefined) {
        return res.status(400).json({ message: "name, price, stock are required" });
    }
    if (typeof price !== "number" || price <= 0) {
        return res.status(400).json({ message: "price must be a number > 0" });
    }
    if (typeof stock !== "number" || stock < 0) {
        return res.status(400).json({ message: "stock must be a number ≥ 0" });
    }

    const newProduct = {
        id: productId++,
        name,
        price,
        stock
    };

    products.push(newProduct);
    res.status(201).json(newProduct);
});


app.get('/product', (req, res) => {
    res.json(products);
});


app.post('/order', (req, res) => {
    const { productId, quantity } = req.body;

    
    if (!productId || !quantity) {
        return res.status(400).json({ message: "productId and quantity are required" });
    }

    const product = products.find(p => p.id === productId);

    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }

    if (product.stock < quantity) {
        return res.status(400).json({ message: "Not enough stock available" });
    }


    product.stock -= quantity;

    const totalPrice = product.price * quantity;

    const newOrder = {
        id: orderId++,
        productId,
        quantity,
        totalPrice
    };

    orders.push(newOrder);

    res.status(201).json({
        status: "success",
        order: newOrder
    });
});


app.get('/order', (req, res) => {
    res.json(orders);
});


app.listen(3000, () => {
    console.log("Server running on port 3000");
});
