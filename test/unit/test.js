var assert = require('assert');
var example = require('../../app/controllers/example');

exports.it_should_add_two_numbers = function(done){
    var result = example.test;
    assert.ok(result === 2);
    return done();
};

exports.it_should_add_two_negative_numbers = function(done){
    var result = add(-2,-2);
    assert.ok(result === -4);
    return done();
};