var error     = require('../controllers/error');
var index     =  require('../models/index');
var validator = require('validator');

module.exports = {

    Get: function(req, res)
    {
        return error.http_success(req, res, { code: 200, message: "TEST GET API OK" });
    },

    GetId: function(req, res)
    {
        if (validator.isInt(req.params.id))
            error.http_success(req, res, { code: 200, message: "TEST GET API id: " + req.params.id });
        else
            error.http_error(req, res, { code: 400 })
    },

    Post: function(req, res)
    {
        error.http_success(req, res, { code: 201, message: "Task created" });
    },

    PutId: function(req, res)
    {
        if (validator.isInt(req.params.id))
            error.http_success(req, res, { code: 200, message: "TEST GET API id: " + req.params.id });
        else
            error.http_error(req, res, { code: 400 });
    },

    DeleteId: function(req, res)
    {
        if (validator.isInt(req.params.id))
            error.http_success(req, res, { code: 200, message: "TEST GET API id: " + req.params.id });
        else
            error.http_error(req, res, { code: 400 });
    }
};