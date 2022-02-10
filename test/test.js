process.env.NODE_ENV = 'test';

  let request = require('supertest');
  let expect = require('chai').expect;

  let app = require('../app');

  describe('Testing endpoint', function() {
    it('successful response', function(done) {
      request(app).get('/healthz').end(function(err, res) {
        expect(res.statusCode).to.equal(200);
        done();
      });
    });

    it('Should check "message" that equals "Hello from Healthz"', function(done) {
      request(app).get('/healthz').end(function(err, res) {
        expect(res.body)
          .to.be.an('object')
          .with.property('message')
          .that.is.a('string')
          .that.equal('Hello from Healthz');
        done();
      });
    });
  });
