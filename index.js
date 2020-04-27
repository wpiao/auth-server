'use strict';

// third party dependencies
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// internal modules
const { start } = require('./lib/server.js');

// access to process.env
dotenv.config();

// connect to mongoDB
const MONGODB_URL = process.env.MONGODB_URL;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

mongoose.connect(MONGODB_URL, options);

// check if successfully connected to mongodb
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', () => console.log('Successfully connected to mongoDB!'));

// start the server
start();