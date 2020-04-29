'use strict';

// third party dependencies
const express = require('express');

// internal modules
const oauth = require('./middlewares/auth/oauth-middleware.js');

// application constant - access all express methods
const app = express();

// global middlewares
// will parse the req.body on post and put request
app.use(express.json());

// this is used to serve static content
app.use(express.static('./public'));

// API Routes
app.get('/oauth', oauth, (req, res) => {
  res.status(200).send(req.token);
})

// exportable and testable server
module.exports = {
  server: app,
  start: port => {
    const PORT = port || process.env.PORT || 3003;
    app.listen(PORT, () => console.log(`listening on port ${PORT}`));
  }
}