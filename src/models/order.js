const createModel = require('./base').createModel;

const orderModel = createModel(
    {
      _id: Number,
      name: String,
      email: String,
      phone: String,
      comment: String,
      date: Date,
      isProcessed: Boolean,
      cartItems: [{
        game: {
          type: Number,
          ref: 'Game'
        },
        count: Number
      }]
    },
    'Order'
).model;

module.exports = orderModel;
