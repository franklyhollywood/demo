const pool = require('../lib/utils/pool');
const twilio = require('twilio');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const OrderService = require('../lib/services/OrderService.js');
const Order = require('../lib/models/order');

jest.mock('twilio', () => () => ({
  messages: {
    create: jest.fn(),
  },
}));

describe('Order Service Test', () => {
  beforeEach(() => {
    return setup(pool);
  });
  beforeEach(async () => {
    await OrderService.createOrder(2);
  });

  it('should create an item', async () => {
    const order = await Order.insert(2);
    expect(order).toEqual({ id: '2', quantity: 2 });
  });
  it('Should get by id', async () => {
    const order = await Order.getById(1);
    expect(order).toEqual({ id: '1', quantity: 2 });
  });
  it('Should get get all', async () => {
    const order = await Order.getAllOrders();
    expect(order).toEqual([
      {
        id: expect.any(String),
        quantity: expect.any(Number),
      },
    ]);
  });

  it('Update order by Id', async () => {
    const order = await Order.update(1, 10);
    expect(order).toEqual({
      id: '1',
      quantity: 10,
    });
  });

  it('should delete item by Id', async () => {
    const order = await Order.deleteOrder(1);
    expect(order).toEqual({ id: '1', quantity: 2 });
  });
});
