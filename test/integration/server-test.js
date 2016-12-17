var supertest = require('supertest');
var server = require('../../server');

exports.addition_should_accept_numbers = function(done){
    supertest(server.app)
        .get('/')
        .expect(200)
        .end(function(err, response){
            assert.ok(!err);
            assert.ok(typeof response.body.result === 'number');
            return done();
        });
};

exports.addition_should_reject_strings = function(done){
    supertest(server.app)
        .get('/example')
        .expect(200)
        .end(done);
};