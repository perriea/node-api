var server   = require('../server.js');
var request  = require('request');
var assert   = require('assert');

// Ignore invalid self-signed ssl certificate
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
var base_url = 'https://localhost:4433/v1/';

describe('Test Server API', function() {
    it('GET /v1/example', function(done) {
        request.get(base_url + 'example', function(error, response, body) {
            assert.equal(200, response.statusCode);
            done();
        });
    });

    it('POST /v1/example', function(done) {
        request.post(base_url + 'example', function(error, response, body) {
            assert.equal(201, response.statusCode);
            done();
        });
    });

    it('GET /v1/example/1', function(done) {
        request.get(base_url + 'example/1', function(error, response, body) {
            assert.equal(200, response.statusCode);
            done();
        });
    });

    it('PUT /v1/example/1', function(done) {
        request.put(base_url + 'example/1', function(error, response, body) {
            assert.equal(200, response.statusCode);
            done();
        });
    });

    it('DELETE /v1/example/1', function(done) {
        request.delete(base_url + 'example/1', function(error, response, body) {
            assert.equal(200, response.statusCode);
            done();
        });
    });
});