const express = require('express')

const app = express();


let products = [
    { id: 1, name: 'iPhone 12 Pro', price: 1099.99 },
    { id: 2, name: 'Samsung Galaxy S21', price: 999.99 },
    { id: 3, name: 'Sony PlayStation 5', price: 499.99 },
    { id: 4, name: 'MacBook Pro 16', price: 2399.99 },
    { id: 5, name: 'DJI Mavic Air 2', price: 799.99 },
];


const getProduct = (req, res) => {
    res.send(products)
}

const getProductSearch = (req, res) => {
    let minPrice = req.query.minPrice;
    let maxPrice = req.query.maxPrice;
    let data = products.filter(product => product.price > minPrice && product.price < maxPrice)
    res.send(data)
}

const getProductById = (req, res, next) => {
    let data = products.find(product => product.id == req.params.id)
    if (data) {
        res.send(data)
    } else {
        const err = new Error('Product not found');
        next(err)
    }
}

const createProduct = (req, res) => {
    let lengthP = products.length;
    let getId = products[lengthP - 1].id;
    let id = getId + 1;
    console.log(req.body)
    let name = req.body.name;
    let price = req.body.price;
    products.push({ id, name, price });
    res.send(products[lengthP]);
    console.log(products)
}

const updateProduct = (req, res) => {
    let myProd = products.find(product => product.id == req.params.id);
    let name = req.body.name;
    let price = req.body.price;
    if (myProd) {
        myProd.name = name
        myProd.price = price
        res.send(products);
    }
}

const deleteProduct = (req, res) => {
    let myProd = products.find(product => product.id == req.params.id);
    if (myProd) {
        products.splice(products.indexOf(myProd, 0), 1)
        res.send(products);
    }
}


module.exports = {
    getProduct, getProductSearch, getProductById, createProduct, updateProduct, deleteProduct
}