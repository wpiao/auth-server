'use strict';

const base64 = require('base-64');
const users = require('../../models/users-model.js');

module.exports = (req, res, next) => {
  // checking headers
  if(!req.headers.authorization) {
    next('Invalid login details, please provide username and password!');
  } else {
    // decode headers
    // headers authorization format 'basic sfsdfahi:woijisafljk'
    const basic = req.headers.authorization.split(' ').pop();
    const [username, password] = base64.decode(basic).split(':');
    users.authenticateBasic(username, password)
      .then(validUser => {
        // generate token
        req.token = users.generateToken(validUser);
        next();
      })
      .catch(err => next(err));
  }
}