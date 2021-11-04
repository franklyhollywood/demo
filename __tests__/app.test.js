const pool = require('../lib/utils/pool');
const twilio = require('twilio');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

jest.mock('twilio', () => () => ({
  messages: {
    create: jest.fn(),
  },
}));

describe('03_separation-of-concerns-demo routes', () => {
  beforeAll(() => {
    return setup(pool);
  });

  it('creates a new order in our database and sends a text message', () => {
    return request(app)
      .post('/api/v1/orders')
      .send({ quantity: 10 })
      .then((res) => {
        // expect(createMessage).toHaveBeenCalledTimes(1);
        expect(res.body).toEqual({
          id: '1',
          quantity: 10,
        });
      });
  });
  it('responsds with an single order by ID', () => {
    return request(app)
      .get('/api/v1/orders/1')
      .then((res) => {
        expect(res.body).toEqual({
          id: '1',
          quantity: 10,
        });
      });
  });

  it('updates an order by ID', () => {
    return request(app)
      .update('/api/v1/orders/1')
      .send({ id: 1, quantity: 11 })
      .then((res) => {
        expect(res.body).toEqual({
          id: '1',
          quantity: 10,
        });
      });
  });
});
