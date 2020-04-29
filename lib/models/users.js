'use strict';

// internal modules
const schema = require('./users-schema.js');
const model = require('./model.js');

// Users class based on model
class Users extends model {};

// instantiate Users and export it
module.exports = new Users(schema);