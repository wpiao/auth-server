'use strict';

// third party dependencies
const express = require('express');

// import all express methods to app
const app = express();

//---------------------------------------
// middlewares
//---------------------------------------
app.use(express.json());

// exportable and testable server
module.exports = {
  server: app,
  start: port => {
    const PORT = port || process.env.PORT || 3003;
    app.listen(PORT, () => console.log(`listening on port ${PORT}`));
  }
};