# auth-server - 4/28/2020
OAuth Implementaion

## How to start this app
1. Run command 'npm install' to install dependencies.
2. Register your app in github OAuth and get client_id, client_secret, and other required information.
3. Set up .env file. You need to change it appropriately to make this app work.
  * `PORT=3000`
  * `MONGODB_URL=<fill it with your mongoDB url>`
  * `CLIENT_ID=<fill it with your client id>`
  * `CLIENT_SECRET=<fill it with your client secret`
  * `SECRET=<fill it with your secret word>`
  * make sure you put this file on .gitignre so that not push it to github
4. Run command 'npm start' or 'npm run start' to start the app.
5. App runs on http://localhost:3000/
6. To test the app, go to http://localhost:3000/ and login with your github credential. App will generate token and send it to you.

## About this app
OAuth Implementation
* Front-end: index.html
* Back-end: Exprss + mongoDB
* Schema: has two properties - username and password
* Authentication service: github OAuth
* API Routes: /oauth - send token to client

## How does OAuth work
* application developers needs to register the application on Github OAuth and get client_id and client_secret etc.
* application developers use client_id and client_secret and designated github url and other information to make an url that redirect the users to github sign in page.
* when user sign in with their github credential, there are several handshake happens:
  1. github authenticates user's credential, upon successful it would send application with one-time-use code.
  2. application server acts as client and use this one-time-use code to make post request with required information to github.
  3. github responds with a token that give access to user's certain github information to the application server.
  4. application server acts as client and use this token to make get request to github to get user's certain github information.
  5. github responds with requested user's github information to the application server.
  6. application server grabs username and generates hashed password for this username and save those credential to the database. Then server generates an application token based on user credential and send it to user for future authentication.

