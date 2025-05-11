# Step-by-Step Documentation for Setting Up Express with Auth0 Authentication

## Introduction

This guide provides a detailed, step-by-step walkthrough for setting up an Express.js application with Auth0 authentication. By following these instructions, you will be able to create a secure authentication system using Auth0 and Express with Passport.js.

## Prerequisites

1. Node.js and npm installed on your system.
2. Basic understanding of Node.js and Express.js.
3. An Auth0 account (sign up at [Auth0](https://auth0.com/)).

---

## 1. Project Setup

### 1.1 Initialize the Project

1. Create a new directory for your project:

   ```bash
   mkdir express-auth0-app
   cd express-auth0-app
   ```

2. Initialize a new npm project:

   ```bash
   npm init -y
   ```

3. Install the required dependencies:

   ```bash
   npm install express passport express-session passport-auth0 dotenv
   ```

### 1.2 Project Structure

Organize your project directory as follows:

```
express-auth0-app/
├── auth/
│   └── auth.js
├── .env
└── index.js
```

---

## 2. Setting Up Environment Variables

### 2.1 Create a .env File

In the root of your project, create a `.env` file:

```
SESSION_SECRET=your_session_secret
AUTH0_DOMAIN=your_auth0_domain
AUTH0_CLIENT_ID=your_auth0_client_id
AUTH0_CLIENT_SECRET=your_auth0_client_secret
AUTH0_CALLBACK_URL=http://localhost:8080/callback
PORT=8080
```

### 2.2 Configure Auth0

1. Go to your [Auth0 Dashboard](https://manage.auth0.com/).
2. Create a new application of type **Regular Web Application**.
3. Set the Allowed Callback URLs to: `http://localhost:8080/callback`
4. Set the Allowed Logout URLs to: `http://localhost:8080/`
5. Set the Allowed Web Origins to: `http://localhost:8080/`
6. Copy your Domain, Client ID, and Client Secret to the `.env` file.

---

## 3. Setting Up Authentication (auth/auth.js)

### 3.1 Create the Auth0 Authentication Strategy

In the `auth/auth.js` file, add the following code:

```javascript
import 'dotenv/config';
import passport from 'passport';
import { Strategy as Auth0Strategy } from 'passport-auth0';

passport.use(new Auth0Strategy({
  domain: process.env.AUTH0_DOMAIN,
  clientID: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  callbackURL: process.env.AUTH0_CALLBACK_URL
}, (accessToken, refreshToken, extraParams, profile, done) => {
  return done(null, profile);
}));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));
```

---

## 4. Setting Up the Express Application (index.js)

### 4.1 Create the Main Application File

In the `index.js` file, write the following code:

```javascript
import 'dotenv/config';
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
  passport.authenticate('auth0', { failureRedirect: '/' }),
  (req, res) => res.redirect('/profile')
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

app.listen(process.env.PORT, () => {
  console.log(`Server started on http://localhost:${process.env.PORT}`);
});
```

---

## 5. Running the Application

### 5.1 Start the Server

```bash
node index.js
```

### 5.2 Test the Application

* Visit `http://localhost:8080`.
* Click **Login** to log in with Auth0.
* After successful login, you will be redirected to the Profile page.
* Use the Logout link to log out.

---
