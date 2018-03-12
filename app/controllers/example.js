// Dependencies
var validator = require('validator');
var path      = require('path');

// Error Controller
var back      = require(path.join(__dirname, '/back'));

// Database models
var database  = require(path.join(__dirname,'../models/index'));

module.exports = {

    Get: function(req, res)
    {
        return back.success(req, res, { code: 200, message: "Hello Word !" });
    },

    GetId: function(req, res)
    {
        if (validator.isInt(req.params.id)) {
            back.success(req, res, { code: 200, message: "Hello world ! id: " + req.params.id });
        } else {
            back.error(req, res, { code: 400 });
        }
    },

    Post: function(req, res)
    {
        back.success(req, res, { code: 201, message: "Hello world !" });
    },

    PutId: function(req, res)
    {
        if (validator.isInt(req.params.id)) {
            back.success(req, res, { code: 200, message: "Hello world ! id: " + req.params.id });
        } else {
            back.error(req, res, { code: 400 });
        }
    },

    DeleteId: function(req, res)
    {
        if (validator.isInt(req.params.id)) {
            back.success(req, res, { code: 200, message: "Hello world ! id: " + req.params.id });
        } else {
            back.error(req, res, { code: 400 });
        }
    }
};