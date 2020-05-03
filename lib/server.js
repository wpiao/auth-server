'use strict';

const express = require('express');
const dotenv = require('dotenv');
const usersRoute = require('./routes/users-route.js');
const errorHandler = require('./middlewares/500.js');
const notFoundHandler = require('./middlewares/404.js');

const app = express();
dotenv.config();

app.use(express.json());
app.use(usersRoute);
app.use('*', notFoundHandler);
app.use(errorHandler);

module.exports = {
  server: app,
  start: port => {
    const PORT = port || process.env.PORT || 3003;
    app.listen(PORT, () => console.log(`app is listening on port ${PORT}`));
  }
}