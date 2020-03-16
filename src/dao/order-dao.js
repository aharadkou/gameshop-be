const Order = require('../models/order');

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

function getOrders(processedStatus) {
  const findParams = {};
  if (processedStatus !== null && processedStatus !== undefined) {
    findParams.isProcessed = processedStatus;
  }
  return Order.find(findParams).sort({ date: 'desc' }).populate('cartItems.game');
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
