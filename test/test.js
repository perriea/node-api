var server   = require("../server.js")
var request  = require("request")
var assert   = require('assert')

// Ignore invalid self-signed ssl certificate
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"
var base_url = "https://localhost:4433/"

describe("Test Server API", function() {
    it("GET /", function(done) {
        request.get(base_url, function(error, response, body) {
            assert.equal(200, response.statusCode)
            done()
        })
    })

    it("GET /example", function(done) {
        request.get(base_url + "example", function(error, response, body) {
            assert.equal(200, response.statusCode)
            done()
        })
    })

    it("GET /example/1", function(done) {
        request.get(base_url + "example/1", function(error, response, body) {
            assert.equal(401, response.statusCode)
            done()
        })
    })
})