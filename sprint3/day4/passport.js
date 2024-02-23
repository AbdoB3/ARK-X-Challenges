const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy; const cookieParser = require('cookie-parser');
const session = require('express-session');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken')

const app = express();
app.use(express.json())

let count = 1;
const users = [
    {
        id: count++,
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

app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    const user = users.find(user => user.id === id);
    if (!user) {
        return done(new Error('User not found'));
    }
    done(null, user);
});


app.get('/users', (reqr, res) => {
    res.json(users)
})
app.post('/registration',
    async (req, res) => {
        try {
            const salt = await bcrypt.genSalt(saltRounds);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
            users.push({ 'id':count++,'username': req.body.username, 'password': hashedPassword });
            res.json(users)
        } catch (err) {
            console.log('catch err: ', err)
        }
    });

app.post('/login', passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users'
    }));



app.get('/logout', (req, res) => {
req.session.destroy((err) => {
    if (err) {
        console.error('Error destroying session:', err);
    }
    res.redirect('/login');
});
});    


passport.use(new LocalStrategy({
usernameField: 'username',
passwordField: 'password'
}, async (username, password, done) => {
const user = users.find(user => user.username === username);

// If user is not found
if (!user) {
    return done(null, false, { message: 'Incorrect username.' });
}

// Compare the provided password with the stored user password
const match = await bcrypt.compare(password, user.password);
if (!match) {
    return done(null, false, { message: 'Incorrect password.' });
}

// If username and password match, return the user
return done(null, user);
}));

app.get('/dashboard', (req, res) => {
res.send('dashboard');
});

app.listen('3000', () => {
    console.log('listening on port 3000')
})