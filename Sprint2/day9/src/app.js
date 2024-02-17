const express = require('express');
const app = express();
const port = 3000;
const products = require('./routes/products')

app.use(express.json());

app.use('/products', products)



app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json('Something broke!');
});

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})