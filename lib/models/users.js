'use strict';

// internal modules
const schema = require('./users.schema.js');
const model = require('./model.js');

// make Users model based on generic Model
class Users extends model {};

// instantiate Users instance and export it to routes
module.exports = new Users(schema);