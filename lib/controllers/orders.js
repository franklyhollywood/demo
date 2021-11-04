const { Router } = require('express');
const OrderService = require('../services/OrderService');

module.exports = Router()
  // if (req.method === 'POST' && req.url === '/api/v1/orders/')
  .post('/', async (req, res, next) => {
    try {
      // req.body === { quantity: 10 }
      const order = await OrderService.createOrder(req.body.quantity);
      // order === { id: '1', quantity: 10 }

      res.send(order);
    } catch (err) {
      next(err);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const order = await OrderService.getOrderById(id);
      res.send(order);
      console.log(id);
    } catch (err) {
      next(err);
    }
  });
