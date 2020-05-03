'use strict';

const model = require('./model.js');
const schema = require('./users-schema.js');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
// const SECRET = process.env.SECRET;

class Users extends model {
  constructor() {
    super(schema);
  }

  // add custom methods here
  // save credentials for sign up process
  async save(record) {
    const queryObject = { username: record.username };
    const findResult = await this.schema.find(queryObject);
    if (!findResult.length) {
      return this.create(record);
    } else {
      return Promise.reject('username is already registered, please use other user name!');
    }
  }

  // generate token
  generateToken(user) {
    console.log(user, SECRET);
    const token = jwt.sign({ username: user.username }, SECRET);
    console.log(token)
    return token;
  }
}

module.exports = new Users();