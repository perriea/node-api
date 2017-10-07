var sequelize  = require('sequelize');
var path       = require('path');

var Middleware = require(path.join(__dirname, '/middleware'));
var Example    = require(path.join(__dirname, '/controllers/example'));

module.exports = function(app, passport, error) {

    app.get('/v1/', function (req, res) {
        error.http_success(req, res, { code: 200, message: "Hello World !" });
    });

    app.route('/v1/example')
        .get(Example.Get)
        .post(Example.Post);

    app.route('/v1/example/:id')
        .get(Middleware.isLoggedIn, Example.GetId)
        .put(Middleware.isLoggedIn, Example.PutId)
        .delete(Middleware.isLoggedIn, Example.DeleteId);


    // =====================================
    // LOGIN ===============================
    // =====================================
    app.post('/v1/auth/login', function(req, res, next) {
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
    app.post('/v1/auth/signup', function(req, res, next) {
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
    app.get('/v1/auth/logout', function(req, res) {
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