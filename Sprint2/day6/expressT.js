const express = require('express');
const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get('/',(req,res)=>{
  res.send('hello world')
  

});

app.post('/expressions',(req,res,next)=>{

})