'use strict';

// third party dependencies
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// internal modules
const { start } = require('./lib/server.js');

// access to variable in .env file
dotenv.config();

// connect mongoDB to server
const MONGODB_URL = process.env.MONGODB_URL;
const options = {
  userNewUrlParser: true
};
mongoose.connect(MONGODB_URL, options);

// check if server successfully connected to mongoDB
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', () => console.log('Connected to mongoDB successfully!'));

// start the server
start();