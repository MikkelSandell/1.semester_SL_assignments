import 'dotenv/config'; // loads env variables
import express from 'express';
import session from 'express-session';
import passport from 'passport';
import './auth/auth.js';

const app = express();

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.send(`<h1>Welcome</h1><a href="/login">Login</a>`);
});

app.get('/login', passport.authenticate('auth0', {
  scope: 'openid email profile'
}));

app.get('/callback',
  passport.authenticate('auth0', {
    failureRedirect: '/'
  }),
  (req, res) => {
    res.redirect('/profile');
  }
);

app.get('/profile', (req, res) => {
  if (!req.user) return res.redirect('/');
  res.send(`<h1>Hello ${req.user.displayName}</h1><a href="/logout">Logout</a>`);
});

app.get('/logout', (req, res) => {
  req.logout(err => {
    if (err) return next(err);
    res.redirect('/');
  });
});
const PORT = process.env.PORT ?? 8080;
app.listen(process.env.PORT, () => {
  console.log(`Server started on http://localhost:${process.env.PORT}`);
});
