const status = require('http-status');
const router = require('express').Router();
const orderDAO = require('../../dao/order-dao');
const validation = require('../middleware/validation');
const authentication = require('../middleware/authentication');
const jwtAuthz = require('express-jwt-authz');
const JWTZ_CONFIG = require('../../constants/constants').JWTZ_CONFIG;

router.post('/', validation.validateOrder, (request, response) => {
  orderDAO.placeOrder(request.body.order, request.body.cart).then(
      order => response.json(order)
  ).catch(
      error => response.status(status.INTERNAL_SERVER_ERROR).json({ message: error })
  );
});

router.put('/:id', authentication, jwtAuthz(['update:order'], JWTZ_CONFIG), validation.validateOrder, (request, response) => {
  orderDAO.updateOrder(request.params.id, request.body).then(
      order => response.json(order)
  ).catch(
      error => response.status(status.INTERNAL_SERVER_ERROR).json({ message: error })
  );
});

router.delete('/:id', authentication, jwtAuthz(['delete:order'], JWTZ_CONFIG), (request, response) => {
  orderDAO.deleteOrderById(request.params.id).then(
      order => response.json(order)
  ).catch(
      error => response.status(status.INTERNAL_SERVER_ERROR).json({ message: error })
  );
});

router.get('/', authentication, jwtAuthz(['read:order'], JWTZ_CONFIG), (request, response) => {
  orderDAO.getOrders(request.query.page, request.query.limit, request.query.processedStatus, request.query.filter).then(
      orders => response.json(orders)
  ).catch(
      error => response.status(status.INTERNAL_SERVER_ERROR).json({ message: error })
  );
});

module.exports = router;
