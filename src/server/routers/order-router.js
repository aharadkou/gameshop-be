const status = require('http-status');
const router = require('express').Router();
const orderDAO = require('../../dao/order-dao');

router.post('/', (request, response) => {
  orderDAO.placeOrder(request.body.order, request.body.cart).then(
      order => response.json(order)
  ).catch(
      error => response.status(status.INTERNAL_SERVER_ERROR).json({ message: error })
  );
});

router.get('/', (request, response) => {
  orderDAO.getOrders(request.query.processedStatus).then(
      orders => response.json(orders)
  ).catch(
      error => response.status(status.INTERNAL_SERVER_ERROR).json({ message: error })
  );
});

module.exports = router;
