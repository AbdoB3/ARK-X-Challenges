
const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017";

const client = new MongoClient(url);

client
  .connect()
  .then(() => console.log("Connected to the database"))
  .catch((error) => console.log("Error: ", error));


const db = client.db('mydb');
const collection = db.collection('users');

collection.insertMany([{ name: "Arkadian", age: "25" },{ name: "Abdou", age: "12" },{ name: "youssef", age: "30" }])
.then(()=>{
    return collection.find({}).toArray();
}).then(user=>{
    console.log(user)
})
