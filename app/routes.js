// Dependencies
var sequelize  = require('sequelize');
var path       = require('path');

// Middleware
var middleware = require(path.join(__dirname, '/middleware'));

// Controllers
var example    = require(path.join(__dirname, '/controllers/example'));
var back       = require(path.join(__dirname, '/controllers/back'));

module.exports = function(app, passport) {

    app.route('/v1/example')
        .get(example.Get)
        .post(example.Post);

    app.route('/v1/example/:id')
        .get(example.GetId)
        .put(example.PutId)
        .delete(example.DeleteId);


    // =====================================
    // LOGIN ===============================
    // =====================================
    app.post('/v1/auth/login', function(req, res, next) {
        passport.authenticate('local-login', function(err, user, info)
        {
            if (err) {
                return back.error(req, res, { code: 500 });
            }
            
            if (user)
            {
                req.session.id = user.dataValues.id;
                req.session.email = user.dataValues.email;
                return back.success(req, res, { code: 200, message: info.message });
            }

            return back.error(req, res, { code: 400 });
        })(req, res, next);
    });


    // =====================================
    // SIGNUP ==============================
    // =====================================
    app.post('/v1/auth/signup', function(req, res, next) {
        passport.authenticate('local-signup', function(err, user, info)
        {
            if (err) {
                return back.error(req, res, { code: 500 });
            }

            if (user) {
                return back.http_success(req, res, { code: 201, message: info.message });
            }

            if (!user && info.message) {
                return back.error(req, res, { code: 400 });
            }

            return back.error(req, res, { code: 400 });
        })(req, res, next);
    });


    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/v1/auth/logout', middleware.isLoggedIn, function(req, res) {
        req.logout();
        return back.success(req, res, { code: 200, message: "logout" });
    });

    app.get('/v1/admin/', middleware.isAdminIn, function(req, res) {
        return res.status(200).send({ Error: false, session: req.session.passport });
    });

    // All routes not found => 404
    app.all('*', function (req, res) {
        return back.error(req, res, { code: 404, message: "Not found" })
    });
};