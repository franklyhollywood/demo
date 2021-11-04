const Order = require('../models/Order');
const { sendSms } = require('../utils/twilio');

module.exports = class OrderService {
  static async createOrder(quantity) {
    await sendSms(
      process.env.ORDER_HANDLER_NUMBER,
      `New Order received for ${quantity}`
    );

    const order = await Order.insert(quantity);
    // order.id === some string
    // order.quantity === quantity

    return order;
  }

  //Change to get order by ID
  static async getOrderById(id) {
    await sendSms(process.env.ORDER_HANDLER_NUMBER, `Your order id is ${id}`);

    const order = await Order.getById(id);
    // order.id === some string
    // order.quantity === quantity

    return order;
  }
  static async update(id, quantity) {
    await sendSms(
      process.env.ORDER_HANDLER_NUMBER,
      `Order Updated! ${id} and the new quanity is ${quantity}`
    );

    const order = await Order.update(id, quantity);
    // order.id === some string
    // order.quantity === quantity

    return order;
  }

  static async delete(id) {
    await sendSms(process.env.ORDER_HANDLER_NUMBER, `Delted Order ${id}`);

    const order = await Order.deleteOrder(id);
    // order.id === some string
    // order.quantity === quantity

    return order;
  }
};
