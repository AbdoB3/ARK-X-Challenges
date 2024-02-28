const express = require('express')
const mongoose = require('mongoose');
const app = express()


mongoose
  .connect("mongodb://localhost:27017/mydb")
  .then(() => console.log("Connected to database"))
  .catch((error) => console.log("Error: ", error.message));

  const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    age: {type: Number}
  });

  const User = mongoose.model('users', userSchema);


  const newUser = new User({
    name: "abdo",
    age: 25,
  });

  
User.findOneAndDelete({name:'anware'})
  .then((user) => {
    if (user) console.log("User deleted successfully: ", user);
    else console.log("User not found");
  })
  .catch((error) => console.log("Error deleting user: ", error));

app.listen('3000',()=>{
    console.log('server listening on port 3000')
})