const mongoose = require('../database/database');
const autoIncrement = require('mongoose-auto-increment');
const mongoosePaginate = require('mongoose-paginate-v2');
autoIncrement.initialize(mongoose.connection);

function createModel(fieldsObj, modelName) {
  const schema = new mongoose.Schema(fieldsObj);
  schema.plugin(autoIncrement.plugin, {
    startAt: 30,
    model: modelName
  });
  schema.plugin(mongoosePaginate);
  schema.virtual('id').get(function() {
    return this._id;
  });
  schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: (doc, ret, options) => {
      ret.id = +ret._id;
      delete ret._id;
    }
  });
  return {
    schema,
    model: mongoose.model(modelName, schema)
  };
}

module.exports = {
  createModel
};
