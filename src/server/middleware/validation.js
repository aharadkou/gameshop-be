const Joi = require('@hapi/joi');
const status = require('http-status');

const gameSchema = Joi.object({
  title: Joi.string().required(),
  categories: Joi.array().min(1),
  description: Joi.string().allow('').optional(),
  imageUrl: Joi.string(),
  price: Joi.number().min(0),
  id: Joi.number()
});

const orderSchema = Joi.object({
  comment: Joi.string().allow('').optional(),
  name: Joi.string().required(),
  email: Joi.string().email(),
  phone: Joi.string().regex(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im),
  cartItems: Joi.array().min(1),
  date: Joi.string(),
  isProcessed: Joi.boolean(),
  id: Joi.number()
});

function validateGame(request, response, next) {
  validate(request, response, next, gameSchema);
}

function validateOrder(request, response, next) {
  validate(request, response, next, orderSchema, request.body.order);
}

function validate(request, response, next, schema, toValidate) {
  const validationResult = schema.validate(toValidate || request.body);
  if (validationResult.error) {
    response.status(status.BAD_REQUEST).json({ message: validationResult.error });
  } else {
    next();
  }
}

module.exports = {
  validateGame, validateOrder
};
