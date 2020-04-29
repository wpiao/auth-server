'use strict';

// third party dependencies
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// internal modules
const schema = require('./users-schema.js');
const model = require('./model.js');

// set SECRET variable as part of jwt for extra auth layer
const SECRET = process.env.SECRET;

// Users class based on model
class Users extends model {
  constructor() {
    super(schema);
  }

  // add some authentication methods to Users class

  // if the user has proper login creds then generate a token that will be used in the future for accessing routes in our app
  generateToken(user) {
    const token = jwt.sign({ username: user.username}, SECRET);
    return token;
  }

  // this function change password to hashed password and then store it to db
  async save(record) {
    const queryObject = { username: record.username };
    console.log(record.password);
    const findResult = await this.schema.find(queryObject);
    console.log(findResult)
    if (!findResult.length) {
      // need to save hashed password, not original password
      record.password = await bcrypt.hash(record.password, 5);
      this.create(record);
    } 
    return findResult;
  }

  // give me back a list of users
  async list() {
    const usersInfo = await this.get();
    // we only need to list username, do not need to list password
    const usernames = [];
    for (let i = 0; i < usersInfo.length; i++) {
      usernames.push(usersInfo[i].username);
    }
    return usernames;
  }
};

// instantiate Users and export it
module.exports = new Users();