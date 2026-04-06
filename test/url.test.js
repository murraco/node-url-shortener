process.env.NODE_ENV = 'test';

const request = require('supertest');
const { assert } = require('chai');
const app = require('../config/express');
const base58 = require('../api/helpers/base58');
const Url = require('../api/models/Url');

describe('Url', () => {
  before(async () => {
    await Url.sync({ force: true });
  });

  describe('POST /api/shorten', () => {
    it('It should short the url: https://medium.com/@xoor/jwt-authentication-service-44658409e12c', async () => {
      const res = await request(app)
        .post('/api/shorten')
        .send({
          url: 'https://medium.com/@xoor/jwt-authentication-service-44658409e12c',
        })
        .expect(201);
      assert.equal(res.body.shortUrl.split('/').slice(-1)[0], base58.encode(1));
    });

    it('returns 400 when url is missing', async () => {
      await request(app)
        .post('/api/shorten')
        .send({})
        .expect(400);
    });
  });

  describe('GET /:encodedId', () => {
    it('It should retrieve the shorten version of the url: https://medium.com/@xoor/jwt-authentication-service-44658409e12c', async () => {
      await request(app)
        .get(`/${base58.encode(1)}`)
        .expect(302);
    });
  });
});
