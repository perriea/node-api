// Dependencies
var path  = require('path');

// Error Controller
var back = require(path.join(__dirname, '/controllers/back'));

// Database Models
var Database = require(path.join(__dirname, '/models/index'));

module.exports = {

    isLoggedIn: function(req, res, next)
    {
        if (req.isAuthenticated()) {
            return next();
        }

        back.error(req, res, { code: 401 });
    },

    isAdminIn: function (req, res, next)
    {
        if (req.isAuthenticated()) {
            Database['users'].find({ where: { authenticate_type: 1, id: req.session.passport } }).then(function (user) {
                if (user) {
                    return next();
                }
            }).catch(function (e) {
                error.error(req, res, { code: 500 });
            });
        }

        back.error(req, res, { code: 401 });
    }
};