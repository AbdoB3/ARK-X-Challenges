const express = require("express");
const mongoose = require('mongoose')
const app = express()

mongoose.connect("mongodb://localhost:27017/mydb")
    .then(() => console.log('connection successful'))
    .catch(err => console.log('connection error ', err))

const ProductSchema = mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true, min: [1, 'Must be at least 1 '], },
    description: { type: String },
    inStock: { type: Boolean },
    createdAt: { type: Date, default: new Date() }
})

const Product = mongoose.model('products', ProductSchema)

const products = [
    {
        name: 'Laptop',
        price: 1200,
        description: 'High-performance laptop with powerful specs.',
        inStock: true,
    },
    {
        name: 'Smartphone',
        price: 800,
        description: 'Latest smartphone with advanced features.',
        inStock: true,
    },
    {
        name: 'Headphones',
        price: 150,
        description: 'Over-ear headphones with noise-cancelling technology.',
        inStock: true,
    },
    {
        name: 'Smartwatch',
        price: 250,
        description: 'Fitness tracker and smartwatch with health monitoring.',
        inStock: false,
    },
    {
        name: 'Camera',
        price: 600,
        description: 'Digital camera with high-resolution imaging.',
        inStock: true,
    },
    {
        name: 'Gaming Console',
        price: 400,
        description: 'Next-gen gaming console for immersive gaming experiences.',
        inStock: true,
    },
    {
        name: 'Bluetooth Speaker',
        price: 80,
        description: 'Portable Bluetooth speaker with crisp sound.',
        inStock: true,
    },
    {
        name: 'Tablet',
        price: 300,
        description: 'Slim and lightweight tablet for on-the-go productivity.',
        inStock: true,
    },
    {
        name: 'Coffee Maker',
        price: 50,
        description: 'Automatic coffee maker for brewing your favorite coffee.',
        inStock: true,
    },
    {
        name: 'Fitness Tracker',
        price: 100,
        description: 'Wearable fitness tracker with heart rate monitoring.',
        inStock: false,
    },
    {
        name: 'External Hard Drive',
        price: 120,
        description: 'Large-capacity external hard drive for data storage.',
        inStock: true,
    },
    {
        name: 'Wireless Mouse',
        price: 30,
        description: 'Ergonomic wireless mouse for comfortable computing.',
        inStock: true,
    },
    {
        name: 'Portable Charger',
        price: 20,
        description: 'Compact portable charger for on-the-go device charging.',
        inStock: true,
    },
    {
        name: 'Smart Bulbs',
        price: 15,
        description: 'Set of smart bulbs for customizable lighting at home.',
        inStock: true,
    },
    {
        name: 'Backpack',
        price: 40,
        description: 'Durable backpack with multiple compartments for storage.',
        inStock: true,
    },
    {
        name: 'Wireless Earbuds',
        price: 120,
        description: 'True wireless earbuds for immersive audio experiences.',
        inStock: false,
    },
    {
        name: 'Graphic Tablet',
        price: 200,
        description: 'Digital graphic tablet for artists and designers.',
        inStock: true,
    },
    {
        name: 'Desk Chair',
        price: 150,
        description: 'Comfortable desk chair with adjustable features.',
        inStock: true,
    },
    {
        name: 'Air Purifier',
        price: 80,
        description: 'HEPA air purifier for cleaner and fresher indoor air.',
        inStock: true,
    },
    {
        name: 'Electric Toothbrush',
        price: 40,
        description: 'Electric toothbrush for effective dental care.',
        inStock: true,
    },
];

/*
Product.insertMany(products)
.then(()=>console.log('all done'))
.catch(err=>console.log('error',err))
*/

/*Product.find({},{name:1,price:1}).sort({price:-1})
.then((users)=>console.log('Sort Products by Price ', users))
.catch(err=>console.log('error ',err))
*/

/*const pageSize = 2;
const pageNumber = 3;

Product.find()
  .skip((pageNumber - 1) * pageSize)
  .limit(pageSize)
  .then((users) => {
    console.log(users);
  });*/

/*Product.aggregate([
    {
        $match: {
            inStock: true // Filter documents where inStock is true
        }
    },
    {
        $count: 'count' // Count the documents
    }
])
.then((count)=>console.log('number is of in stock',count[0].count))
.catch(err=>console.log('error ',err))
*/

/*
Product.aggregate([
    {
        $group: {
            _id: '',
            averageAge: { $avg: "$price" }
        }
    }
])
.then((count)=>console.log(count))
.catch(err=>console.log('error ',err))
*/

/*
Product.find().sort({name : 1})
.then((users)=>console.log(users))
.catch(err=>console.log('error ',err))
*/

const updateProductByName = (name)=>{
    Product.findOneAndUpdate({name:name},{$set:{price:1500}}) 
    .then(prod=>console.log(prod))
}
/*
const pageSize = 4;
const pageNumber = 3;

Product.aggregate([
    {
        $group: {
            _id: '$inStock'

        }
    },
    {
        $skip: (pageNumber - 1) * pageSize
    },
    {
        $limit: pageSize
    }
])
.then((products) => {
    console.log(products);
})
.catch((error) => {
    console.error('Error:', error);
});
*/

updateProductByName('Laptop');

const PORT = 3000;
app.listen(PORT, () => {
    console.log('listening on port ', PORT)
})