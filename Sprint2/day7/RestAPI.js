//Product Management API with fs

const express = require('express')
const fs = require('fs');

const app=express();

app.use(express.json())
const port=3000;

let data = fs.readFileSync('products.json','utf-8');
let products=JSON.parse(data)


// Middleware 1: Logging middleware
app.use((req, res, next) => {
    let logs= `[${new Date().toISOString()}] ${req.method} ${req.url} \n`;
    fs.appendFileSync("logs.txt", logs, "utf8");
    next();
  });



app.get('/products',(req,res)=>{
    res.send(products)
})

app.get('/products/search',(req,res)=>{
    let minPrice=req.query.minPrice;
    let maxPrice=req.query.maxPrice;
    let data=products.filter(product=>product.price>minPrice && product.price<maxPrice)
        res.send(data)    
})


app.get('/products/:id',(req,res,next)=>{
    let data=products.find(product=>product.id==req.params.id)
    if(data){
        res.send(data)
    }else{
        const err = new Error('Example error');
        next(err);
    }
})


app.post('/products',(req,res)=>{
    let lengthP=products.length;
    let getId=products[lengthP-1].id;
    let id=getId+1;
    let name=req.body.name;
    let price=req.body.price;
    products.push({id,name,price});   
    fs.writeFileSync('products.json', JSON.stringify(products));
    res.send(products[lengthP]); 
    console.log(products)
})

app.put('/products/:id',(req,res)=>{
    let myProd=products.find(product=>product.id==req.params.id);
    let name=req.body.name;
    let price=req.body.price;
    if(myProd){
        myProd.name=name
        myProd.price=price
        fs.writeFileSync('products.json', JSON.stringify(products));
        res.send(products); 
    }
})

app.delete('/products/:id',(req,res)=>{
    let myProd=products.find(product=>product.id==req.params.id);
    if(myProd){
        products.splice(products.indexOf(myProd,0),1)
        fs.writeFileSync('products.json', JSON.stringify(products));
        res.send(products); 
    }
})

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json('Something broke!');
  });

app.listen(port,()=>{
    console.log(`listening to port ${port}`);
});
