const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken')

const app = express();
app.use(express.json())

const users = [
    {
      username: 'alice',
      password: 'bihi',
    },
    // Add more user objects as needed
  ];

app.use(
    session({
      secret: 'mySecretKey', // Secret key used to sign the session ID cookie
      resave: false, // Whether to save the session for every request, even if it hasn't changed
      saveUninitialized: true // Whether to save uninitialized sessions (new but not modified)
    })
  );

app.use(cookieParser());

const authenticateUser = (req, res, next) => {
  if (req.session && req.session.username) {
    console.log('req.session ',req.session)
    console.log('username ',req.session.username)
    next(); // Proceed to the next middleware/route handler
  } else {
    // If the session username doesn't exist, redirect the user to the login page
    res.redirect('/protected'); // Redirect to login page or any other appropriate route
  }
};


app.get('/users',(reqr,res)=>{
  res.json(users)
})
  app.post('/registration', 
   async (req, res) => {
    try{
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      users.push({'username':req.body.username,'password':hashedPassword});
      console.log(users);
      res.json(users)
    }catch(err){
      console.log('catch err: ',err)
    }
  });
  
    app.post('/login', 
   async (req, res) => {
    let user = users.find(u=>u.username===req.body.username)
    const match = await bcrypt.compare(req.body.password, user.password);
    console.log(users)
    if(!user){
      res.send('erro')
    }
    if(!match ){
      res.status(402).send("Incort password")
    }
    req.session.username = user.username;
    res.send('done')
  })


app.get('/protected',authenticateUser,(req,res)=>{
  if(req.session.username){
    res.send('welcome to the dashboard')
  }
})

app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
    }
    res.redirect('/login'); 
  });
});


app.listen('3000',()=>{
    console.log('listening on port 3000')
})