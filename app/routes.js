var sequelize  = require('sequelize');
var path       = require('path');

var Middleware = require(path.join(__dirname, '/middleware'));
var Example    = require(path.join(__dirname, '/controllers/example'));
//var colors   = require(path.join(__dirname, '../config/color'));
//var MUsers   = require(path.join(__dirname, '/models/users'));

module.exports = function(app, passport, error) {

    app.get('/', function (req, res) {
        error.http_success(req, res, { code: 200, message: "Hello World !" });
    });

    app.route('/example')
        .get(Example.testGet)
        .post(Example.testPost);

    app.route('/example/:id')
        .get(Middleware.isLoggedIn, Example.testGetId)
        .post(Middleware.isLoggedIn, Example.testPostId)
        .put(Middleware.isLoggedIn, Example.testPutId)
        .delete(Middleware.isLoggedIn, Example.testDeleteId);


    // =====================================
    // LOGIN ===============================
    // =====================================
    app.post('/api/auth/login', function(req, res, next) {
        passport.authenticate('local-login', function(err, user, info)
        {
            if (err)
                error.http_error(req, res, { code: 500 });
            if (user)
            {
                req.session.id = user.dataValues.id;
                req.session.email = user.dataValues.email;

                return error.http_success(req, res, { code: 200, message: info.message });
            }

            return error.http_error(req, res, { code: 400 });
        })(req, res, next);
    });


    // =====================================
    // SIGNUP ==============================
    // =====================================
    app.post('/api/auth/signup', function(req, res, next) {
        passport.authenticate('local-signup', function(err, user, info)
        {
            if (err)
                return error.http_error(req, res, { code: 500 });
            if (user)
                return error.http_success(req, res, { code: 201, message: info.message });
            if (!user && info.message)
                return error.http_error(req, res, { code: 400 });

            return error.http_error(req, res, { code: 400 });
        })(req, res, next);
    });


    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        error.http_success(req, res, { code: 200, message: "logout" });
    });

    app.get('/admin', Middleware.isAdminIn, function(req, res) {
        res.status(200).send({ error: false, session: req.session.passport });
    });

    // All routes not found => 404
    app.all('*', function (req, res) {
        error.http_error(req, res, { code: 404, message: "Not found" })
    });
};