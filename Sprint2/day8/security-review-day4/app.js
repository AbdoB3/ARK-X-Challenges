const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser')
const csurf = require('csurf');
const jwt= require('jsonwebtoken')
const { body, validationResult } = require('express-validator');


const app = express();
app.use(express.json());

// Middleware

app.use(express.urlencoded({ extended: false }));
app.use(session({ secret: 'your-secret-key', resave: false, saveUninitialized: false }));
app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(csurf({ cookie: true }));

// Routes
app.get('/', (req, res) => {
  res.render('index', { csrfToken: req.csrfToken() });
});

app.post('/login', 
body('username').isLength({ min: 5 }).trim().escape(),
body('password').isLength({ min: 6 }).trim().escape(),
(req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const user = { id: 123,
                username:req.body.username,
                password:req.body.password 
              }; // Example user object

  const token = jwt.sign({ user: user.id }, 'secret_key', { expiresIn: '2h' });
  console.log(token);
  req.session.token = token;

  const hardcodedUsername = 'admin';
  const hardcodedPassword = 'password';

  if (user.username === hardcodedUsername && user.password === hardcodedPassword) {
    req.session.isAuthenticated = true;
    res.redirect('/dashboard');
  } else {
    res.redirect('/');
  }
});

function ensureToken(req, res, next) {
  const bearerHeader =  req.session.token || req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    const bearerToken = bearerHeader.split(' ')[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
}

app.get('/dashboard', ensureToken,(req, res) => {
  // Secure the dashboard route to only allow authenticated users
  if (req.session.isAuthenticated) {
    res.render('dashboard');
  } else {
    res.redirect('/');
  }
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});

