var sequelize  = require('sequelize');
var path       = require('path');

var Middleware = require(path.join(__dirname, '/middleware'));
var CExample    = require(path.join(__dirname, '/controllers/example'));
var CError      = require(path.join(__dirname, '/controllers/error'));

module.exports = function(app, passport) {

    app.route('/v1/example')
        .get(CExample.Get)
        .post(CExample.Post);

    app.route('/v1/example/:id')
        .get(CExample.GetId)
        .put(CExample.PutId)
        .delete(CExample.DeleteId);


    // =====================================
    // LOGIN ===============================
    // =====================================
    app.post('/v1/auth/login', function(req, res, next) {
        passport.authenticate('local-login', function(err, user, info)
        {
            if (err)
                return CError.http_error(req, res, { code: 500 });
            if (user)
            {
                req.session.id = user.dataValues.id;
                req.session.email = user.dataValues.email;
                return CError.http_success(req, res, { code: 200, message: info.message });
            }

            return CError.http_error(req, res, { code: 400 });
        })(req, res, next);
    });


    // =====================================
    // SIGNUP ==============================
    // =====================================
    app.post('/v1/auth/signup', function(req, res, next) {
        passport.authenticate('local-signup', function(err, user, info)
        {
            if (err)
                return CError.http_error(req, res, { code: 500 });
            if (user)
                return CError.http_success(req, res, { code: 201, message: info.message });
            if (!user && info.message)
                return CError.http_error(req, res, { code: 400 });

            return Error.http_Error(req, res, { code: 400 });
        })(req, res, next);
    });


    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/v1/auth/logout', Middleware.isLoggedIn, function(req, res) {
        req.logout();
        return CError.http_success(req, res, { code: 200, message: "logout" });
    });

    app.get('/v1/admin/', Middleware.isAdminIn, function(req, res) {
        return res.status(200).send({ Error: false, session: req.session.passport });
    });

    // All routes not found => 404
    app.all('*', function (req, res) {
        return CError.http_error(req, res, { code: 404, message: "Not found" })
    });
};