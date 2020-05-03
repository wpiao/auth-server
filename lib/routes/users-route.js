'use strict';

const express = require('express');
const users = require('../models/users-model.js');
const basicAuth = require('../middlewares/auth/basic-auth-middleware');

const usersRoute = express.Router();

// API routes
usersRoute.post('/signup', handleSignup);
usersRoute.post('/signin', basicAuth, handleSignin);
usersRoute.get('/users', basicAuth, getAllUsers);

function handleSignup(req, res) {
  users.save(req.body)
    .then(user => {
      // generate token and send it back to client
      const token = users.generateToken(user);
      res.status(200).send(token);
    })
    .catch(err => res.status(403).send(err));
}

function handleSignin(req, res) {
  res.status(200).send(req.token);
}

function getAllUsers(req, res) {
  users.get()
    .then(data => {
      // only need send usernames not other information
      const allUsers = data.map(user => user.username);
      res.status(200).send(allUsers);
    })
    .catch(err => res.status(403).send(err));
}

module.exports = usersRoute;