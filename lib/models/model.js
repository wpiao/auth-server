'use strict';

// this is generic / dynamic model
class Model {
  constructor(schema) {
    this.schema = schema;
  }

  // read CRUD operation
  get(id) {
    const queryObject = id ? { id } : {};
    return this.schema.find(queryObject);
  }

  // create CRUD operation
  create(record) {
    const newRecord = new this.schema(record);
    return newRecord.save();
  }

  // update CRUD operation
  update(id, record) {
    return this.schema.findByIdAndUpdate(id, record, { new: true}); // return updated record
  }

  // delete CRUD operation
  delete(id) {
    return this.schema.findByIdAndDelete(id);
  }
}

module.exports = Model;