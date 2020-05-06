const Order = require('../models/order');
const CUSTOM_LABELS = require('../constants/constants').CUSTOM_LABELS;
const getFilterRegExp = require('../utils/string-utils').getFilterRegExp;

function placeOrder(order, cart) {
  if (order && cart) {
    order.date = new Date();
    order.isProcessed = false;
    const cartItems = [];
    Object.keys(cart).forEach(gameId => {
      cartItems.push({
        game: +gameId,
        count: cart[gameId]
      });
    });
    order.cartItems = cartItems;
    return Order.create(order);
  } else {
    return Promise.resolve(null);
  }
}

function getOrders(page, limit, processedStatus, filter) {
  const searchRegExp = getFilterRegExp(filter);
  const findParams = {
    $or: [
      { name: searchRegExp },
      { email: searchRegExp },
      { phone: searchRegExp }
    ]
  };
  if (filter && !isNaN(filter.trim()) && Number.isSafeInteger(+filter)) {
    findParams.$or.push({
      _id: +filter
    });
  }
  if (processedStatus !== null && processedStatus !== undefined) {
    findParams.isProcessed = processedStatus;
  }
  return Order.paginate(
      findParams,
      { page, limit, sort: { date: 'desc' }, customLabels: CUSTOM_LABELS, populate: 'cartItems.game' }
  );
}

function updateOrder(id, order) {
  order._id = id;
  return Order.findByIdAndUpdate({ _id: id }, order, { new: true }).populate('cartItems.game');
}

function deleteOrderById(orderId) {
  return Order.findByIdAndDelete(orderId);
}

module.exports = {
  placeOrder,
  getOrders,
  updateOrder,
  deleteOrderById
};
