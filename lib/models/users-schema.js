'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const users = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true }
});

users.pre('save', async function() {
  // hash password
  this.password = await bcrypt.hash(this.password, 5);
});

module.exports = mongoose.model('users', users);