'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const users = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true }
});

users.pre('save', async function(err, user) {
  // hash password
  console.log(user);
  // this.password = await bcrypt.hash(this.password, 5);
  // console.log(this);
});

module.exports = mongoose.model('users', users);