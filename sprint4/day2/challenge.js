const express = require('express');
const mongoose = require('mongoose')
const app = express();

mongoose
  .connect("mongodb://localhost:27017/mydb")
  .then(() => console.log("Connected to database"))
  .catch((error) => console.log("Error: ", error.message));

  const userSchema= new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    age:{type:Number},
    date:{type:Date, default:Date.now()}
  })

  
  const User = mongoose.model('users',userSchema)

  const newUser = new User({
    name: "ggszuwe sousou",
    email: "minmou.bihi@arkx.group",
    age: 50
  })
  //newUser.save();
  const fetchUsers = async ()=>{
    const users =  await User
    .find()
    .limit(1)
    console.log(users);
  }
  const fetchByName = async () =>{
    const user = await User
    .find({name : 'Mike Ross',email:'mike.ross@arkx.group'})
    console.log(user)
  } 
  const updateUserEmail = async (givenName) =>{
    const user = await User
    .findOneAndUpdate({name : 'Aboud'},{$set:{name:givenName}})

    if(user) console.log('user updated successfully',user)
    else console.log('User not found')
    
  } 

  const deleteUsers = async (date)=>{
    try {
      const result = await User.deleteMany({ date: { $lt: date } });
      console.log(`${result.deletedCount} users deleted successfully`);
      return result; // Return information about the deletion operation
  } catch (error) {
      console.error('Error deleting users:', error);
      throw error; // Rethrow the error to be caught by the caller
  }
  }

  //fetchUsers()
  //fetchByName()
  //updateUserEmail('Ninja')
  deleteUsers(new Date('2024-02-28T09:13:39.361+00:00'))
const port = 3000;
app.listen(port, () => {
    console.log('server listening on port ' + port);
})