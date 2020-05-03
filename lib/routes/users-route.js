'use strict';

const express = require('express');
const users = require('../models/users-model.js');

const usersRoute = express.Router();

// API routes
usersRoute.post('/signup', handleSignup);

function handleSignup(req, res, next) {

}