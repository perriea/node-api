var LocalStrategy    = require('passport-local').Strategy;
var GoogleStrategy   = require('passport-google-oauth').OAuth2Strategy;
var TwitterStrategy  = require('passport-twitter').Strategy;

var validator        = require('validator');

// on va chercher la config d'auth
var configAuth       = require('./auth');

// on charge le model MySQL (Sequelize)
var MUsers           = require('../app/models/users');

module.exports = function(passport) {

    // =========================================================================
    // PASSPORT SESSION ========================================================
    // =========================================================================

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        MUsers.TUsers.find({ where: { id: id }})
            .then(function(user){
                done(null, user);
            }).error(function(err) {
            done(err, null);
        });
    });

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================

    passport.use('local-signup', new LocalStrategy({
            // on determine par defaut les champs
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true
        },
        function(req, email, password, done)
        {
            process.nextTick(function() {

                // on cherche si un utilisateur est déjà incrit avec l'adresse mail envoyé
                MUsers.TUsers.find({ where: { email: email }}).then(function(user)
                {
                    // Si un user existe avec cette email on lui indique c'est deja pris
                    // sinon on cree le user
                    if (user)
                        return done(null, false, { message: 'Adresse mail déjà utilisée !' });
                    else
                    {
                        if (validator.isLength(password, { min: 6, max: 30 }))
                        {
                            MUsers.TUsers.create({ email: email, password: MUsers.methods.generateHash(password), authenticate_id: 1, role_id: 1 }).then(function(result) {
                                return done(null, result, { message: 'Inscription réalisée avec succès !' });
                            }).catch(function(e) {
                                console.log("Inscription locale : Erreur dans la creation de l'utilisateur.");
                                return done(e, false, { message: "Une erreur est arrivée lors de l'inscription !" });
                            });
                        }
                        else
                        {
                            console.log("Inscription locale : Erreur longueur du mot de passe insufisante !");
                            return done(null, false, { message: 'La longueur du mot de passe est insufisante !' });
                        }
                    }

                }).catch(function(e) {
                    console.log("Incription locale : Erreur dans le recherche de l'utilisateur.");
                    return done(e, false, { message: "Une erreur est arrivée lors de l'inscription !" });
                });

            });

        }));


    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================

    passport.use('local-login', new LocalStrategy({
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true
        },
        function(req, email, password, done)
        {
            // Si un user existe on regarde si le mot de passe est correct
            MUsers.TUsers.find({ where: { email: email }}).then(function(user)
            {
                // si le user n'existe pas, on retourne ce message
                if (!user)
                    return done(null, false, { message: 'Cet utilisateur n\'existe pas' }); // req.flash is the way to set flashdata using connect-flash

                // on verifie le mot de passe
                if (!MUsers.methods.validPassword(password, user))
                    return done(null, false, { message: 'Mot de passe invalide !' }); // create the loginMessage and save it to session as flashdata

                // si tout est ok, on cree la session
                return done(null, user, { message: 'Authentification réussie ' });
            }).catch(function(e) {
                console.log("Auth locale : Erreur dans le recherche de l'utilisateur.");
                return done(e, null);
            });

        }));


    // =========================================================================
    // GOOGLE ==================================================================
    // =========================================================================
    passport.use(new GoogleStrategy({
            clientID        : configAuth.googleAuth.clientID,
            clientSecret    : configAuth.googleAuth.clientSecret,
            callbackURL     : configAuth.googleAuth.callbackURL,
        },
        function(token, refreshToken, profile, done)
        {
            process.nextTick(function()
            {
                MUsers.TUsers.find({ where: { email: profile.emails[0].value }}).then(function(user)
                {
                    if (user == null)
                    {
                        MUsers.TUsers.create({ lastname: profile.name.familyName, firstname: profile.name.givenName, sex: "M", email: profile.emails[0].value, authenticate_type: 2 }).then(function(result) {
                            return done(null, result);
                        }).catch(function(e) {
                            console.log("Google OAuth : Erreur dans la creation de l'utilisateur quand il n'existe pas.");
                            return done(e, null);
                        });
                    }
                    else
                        return done(null, user);

                }).catch(function(e) {
                    console.log("Google OAuth : Erreur dans le recherche de l'utilisateur.");
                    return done(e, null);
                });
            });
        }));


    // =========================================================================
    // TWITTER =================================================================
    // =========================================================================
    passport.use(new TwitterStrategy({
            consumerKey     : configAuth.twitterAuth.consumerKey,
            consumerSecret  : configAuth.twitterAuth.consumerSecret,
            callbackURL     : configAuth.twitterAuth.callbackURL
        },
        function(token, tokenSecret, profile, done)
        {
            process.nextTick(function()
            {
                MUsers.TUsers.find({ where: { email: profile.dataValues.email }}).then(function(user)
                {
                    if (user == null)
                    {
                        MUsers.TUsers.create({ lastname: profile.dataValues.lastname, firstname: profile.dataValues.firstname, email: profile.dataValues.email, authenticate_type: 3 }).then(function(result) {
                            return done(null, result);
                        }).catch(function(e) {
                            console.log("Twitter OAuth : Erreur dans la creation de l'utilisateur.");
                            return done(e, null);
                        });
                    }
                    else
                        return done(null, user);

                }).catch(function(e) {
                    console.log("Twitter OAuth : Erreur dans le recherche de l'utilisateur.");
                    return done(e, null);
                });
            });
        }));
};