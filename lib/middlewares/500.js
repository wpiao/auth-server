'use strict';

module.exports = (err, req, res, next) => {
  res.status(500);
  res.statusMessage = 'generic server error';
  res.json({ error: err });
  next();
}