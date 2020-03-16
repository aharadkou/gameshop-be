const mongoose = require('../database/database');
const autoIncrement = require('mongoose-auto-increment');
const mongoosePaginate = require('mongoose-paginate-v2');

function createModel(fieldsObj, modelName) {
  const schema = new mongoose.Schema(fieldsObj);
  autoIncrement.initialize(mongoose.connection);
  schema.plugin(autoIncrement.plugin, modelName);
  schema.plugin(mongoosePaginate);
  schema.virtual('id').get(function() {
    return this._id;
  });
  schema.set('toJSON', {
    virtuals: true,
    versionKey: false
  });
  return {
    schema,
    model: mongoose.model(modelName, schema)
  };
}

module.exports = {
  createModel
};
