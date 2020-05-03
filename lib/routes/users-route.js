'use strict';

const express = require('express');
const users = require('../models/users-model.js');

const usersRoute = express.Router();

// API routes
usersRoute.post('/signup', handleSignup);

function handleSignup(req, res) {
  users.save(req.body)
    .then(user => {
      // generate token and send it back to client
      const token = users.generateToken(user);
      res.status(200).send(token);
    })
    .catch(err => res.status(403).send(err));
}

module.exports = usersRoute;