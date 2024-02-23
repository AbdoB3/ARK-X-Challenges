const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser());

app.get('/', (req, res) => {
  // Set a cookie with a name 'username' and value 'Said'
  res.cookie('name', 'Abdou');

  res.send('Cookie has been set!');
});

app.get('/profile', (req, res) => {
  // Read the value of the 'username' cookie
  const username = req.cookies.name;
    console.log(req.cookies)
  // Display the username in the response
  res.send(`Welcome, ${username}!`);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});