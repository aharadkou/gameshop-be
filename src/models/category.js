const createModel = require('./base').createModel;

const categoryModel = createModel(
    {
      _id: Number,
      name: String
    },
    'Category'
).model;

module.exports = categoryModel;
