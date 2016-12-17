var error = require('../controllers/error');

module.exports = {

    test: function(req, res)
    {
        error.http_error(req, res, { code: 200, message: "TEST API OK" });
    },

    testId: function(req, res)
    {
        error.http_error(req, res, { error: 200, message: "TEST API " + req.params.num });
    },

    node_mysql: function (req, res)
    {
        error.http_error(req, res, { error: 200, message: "API OK" });
    }
};