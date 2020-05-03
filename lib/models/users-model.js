'use strict';

const model = require('./model.js');
const schema = require('./users-schema.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config();
const SECRET = process.env.SECRET;

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
    const token = jwt.sign({ username: user.username }, SECRET);
    return token;
  }

  // authenticate credentials for sign in process
  async authenticateBasic(username, password) {
    const isUserValid = await this.schema.find({ username });
    if (!isUserValid.length) {
      return Promise.reject('username is not registered, please sign up first!');
    } else {
      // compare hashed password with decoded password from req headers
      const isPasswordValid = await bcrypt.compare(password, isUserValid[0].password);
      if (isPasswordValid) {
        return isUserValid[0];
      } else {
        return Promise.reject('invalid password');
      }
    }
  }
}

module.exports = new Users();