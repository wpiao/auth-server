'use strict';

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { start } = require('./lib/server.js');
dotenv.config();

const MONGODB_URL = process.env.MONGODB_URL;
const options = {
  useNewUrlParser: true
}

mongoose.connect(MONGODB_URL, options);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', () => console.log('mongoDB is connected'));

start();