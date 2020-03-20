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

router.put('/:id', (request, response) => {
  orderDAO.updateOrder(request.params.id, request.body).then(
      order => response.json(order)
  ).catch(
      error => response.status(status.INTERNAL_SERVER_ERROR).json({ message: error })
  );
});

router.delete('/:id', (request, response) => {
  orderDAO.deleteOrderById(request.params.id).then(
      order => response.json(order)
  ).catch(
      error => response.status(status.INTERNAL_SERVER_ERROR).json({ message: error })
  );
});

router.get('/', (request, response) => {
  orderDAO.getOrders(request.query.page, request.query.limit, request.query.processedStatus, request.query.filter).then(
      orders => response.json(orders)
  ).catch(
      error => response.status(status.INTERNAL_SERVER_ERROR).json({ message: error })
  );
});

module.exports = router;
