const createModel = require('./base').createModel;

const gameModel = createModel(
    {
      _id: Number,
      categories: [{
        type: Number,
        ref: 'Category'
      }],
      description: String,
      title: String,
      imageUrl: String,
      price: Number
    },
    'Game'
).model;

module.exports = gameModel;

