'use strict';

// third party dependencies
const axios = require('axios');

// internal modules
const users = require('../../models/users.js');

// these are required credentials. some are private, some are public for login/signup with a 3rd party service - OAuth
// public credentials are ok to expose to public, but make sure not expose private credentials. Do not push private credentials to github.
const tokenServerUrl = 'https://github.com/login/oauth/access_token';
const remoteAPI = 'https://api.github.com/user';
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const API_SERVER = 'http://localhost:3000/oauth';

// export OAuth middleware
module.exports = async function authorize(req, res, next) {
  // in here we will do the handshake
  // 1 - pop up a login/signup screen from github
  // 2 - make a request to github with a "code" that comes from that popup
  // 3 - github will respond with a token
  // 4 - send that token back to github (remoteAPI) and github will respond with user details
  // 5 - save the user and generate a user token for our app

  try {
    const code = req.query.code;
    console.log('__CODE__: ', code);

    const remoteToken = await exchangeCodeForToken(code);
    console.log('__GITHUB TOKEN__: ', remoteToken);

    const remoteUser = await getRemoteUserInfo(remoteToken);
    console.log('__GITHUB USER: ', remoteUser);

    const [user, token] = await getUser(remoteUser);
    req.token = token;
    req.user = user;

    console.log('__LOCAL USER__: ', user);
    next();
  } catch (error) {
    next(`Error: ${error}`);
  }
}

// this will use the access_token github api endpoint
async function exchangeCodeForToken(code) {
  const tokenResponse = await axios.post(tokenServerUrl)
    .send({
      code: code,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      redirect_uri: API_SERVER,
      grant_type: 'authorization_code' // anything
    });
    
    const access_token = tokenResponse.body.access_token;
    return access_token;
}

// this will use access token to access user api endpoint to get user info
async function getRemoteUserInfo(token) {
  // this will use the access token to get user info
  const userResponse = await axios.get(remoteAPI)
    .set('user-agent', 'express-app')
    .set('Authorization', `token ${token}`);

  const user = userResponse.body;
  return user;
}

async function getUser(remoteUser) {
  // this will actually save the user to the db and return user details from the db
  const userRecord = {
    username: remoteUser.login,
    password: 'canbeanything'
  }

  const user = await users.save(userRecord);
  // this is meant for us to generate a final user token to access routes in our app
  // this token will be used for bearer token
  const token = users.generateToken(user);
  return [user, token];
}