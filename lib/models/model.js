'use strict';

// generic (dynamic) model
class Model {
  constructor(schema) {
    this.schema = schema;
  }

  // get method for READ CRUD operation
  // if id is given, then return the item with given id or return error if the item doesn't exist for given id
  // if id is not given, then return all data
  get(id) {
    // if(id) {
    //   return this.schema.findById(id);
    // } else {
    //   return this.schema.find({});
    // }
    const queryObject = id ? { id } : {};
    return this.schema.find(queryObject);
  }

  // post method for CREATE CRUD operation
  // it will create a new record and save it to the database
  post(record) {
    let newRecord = new this.schema(record);
    return newRecord.save();
  }

  // put method for UPDATE CRUD operation
  // it will update a record with a given id
  put(id, record) {
    return this.schema.findByIdAndUpdate(id, record, { new: true }); // return modified record
  }

  // delete method for DELETE operation
  // it will delete a record with a given id
  delete(id) {
    return this.schema.findByIdAndDelete(id);
  }
}

module.exports = Model;

