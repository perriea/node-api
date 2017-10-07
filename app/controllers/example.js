var error     = require(__dirname + '/error');
var database  = require('../models/index');
var validator = require('validator');

module.exports = {

    Get: function(req, res)
    {
        return error.http_success(req, res, { code: 200, message: "Hello Word !" });
    },

    GetId: function(req, res)
    {
        if (validator.isInt(req.params.id))
            error.http_success(req, res, { code: 200, message: "Hello world ! id: " + req.params.id });
        else
            error.http_error(req, res, { code: 400 })
    },

    Post: function(req, res)
    {
        error.http_success(req, res, { code: 201, message: "Hello world !" });
    },

    PutId: function(req, res)
    {
        if (validator.isInt(req.params.id))
            error.http_success(req, res, { code: 200, message: "Hello world ! id: " + req.params.id });
        else
            error.http_error(req, res, { code: 400 });
    },

    DeleteId: function(req, res)
    {
        if (validator.isInt(req.params.id))
            error.http_success(req, res, { code: 200, message: "Hello world ! id: " + req.params.id });
        else
            error.http_error(req, res, { code: 400 });
    }
};