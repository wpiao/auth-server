'use strict';

// third party dependencies
const express = require('express');

// application constant - access all express methods
const app = express();

// global middlewares
app.use(express.json());

// exportable and testable server
module.exports = {
  server: app,
  start: port => {
    const PORT = port || process.env.PORT || 3003;
    app.listen(PORT, () => console.log(`listening on port ${PORT}`));
  }
}