const setup = require('../data/setup.js');
const pool = require('../lib/utils/pool');
const OrderService = require('../lib/services/OrderService.js');

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
    const order = await OrderService.createOrder(2);
    expect(order).toEqual({ id: '2', quantity: 2 });
  });
  it('Should get by id', async () => {
    const order = await OrderService.getOrderById(1);
    expect(order).toEqual({ id: '1', quantity: 2 });
  });
  it('Should get get all', async () => {
    const order = await OrderService.getAll();
    expect(order).toEqual([
      {
        id: expect.any(String),
        quantity: expect.any(Number),
      },
    ]);
  });

  it('Update order by Id', async () => {
    const order = await OrderService.update(1, 10);
    expect(order).toEqual({
      id: '1',
      quantity: 10,
    });
  });

  it('should delete item by Id', async () => {
    const order = await OrderService.delete(1);
    expect(order).toEqual({ id: '1', quantity: 2 });
  });
});
