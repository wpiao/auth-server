'use strict';

const model = require('./model.js');
const schema = require('./users-schema.js');

class Users extends model {
  constructor() {
    super(schema);
  }

  // add custom methods here
  async save(record) {
    const queryObject = { username: record.username };
    this.schema.find(queryObject)
      .then(response => {
        if (!response.length)
      })
  }
}

module.exports = new Users();