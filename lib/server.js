'use strict';

const express = require('express');
const dotenv = require('dotenv');

const app = express();
dotenv.config();

app.use(express.json());

module.exports = {
  server: app,
  start: port => {
    const PORT = port || process.env.PORT || 3003;
    app.listen(PORT, () => console.log(`app is listening on port ${PORT}`));
  }
}