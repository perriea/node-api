module.exports = function(passport) {

    // =====================================
    // GOOGLE ROUTES =======================
    // =====================================
    app.get('/api/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

    app.get('/api/auth/google/callback', passport.authenticate('google', {
        successRedirect : '/profile',
        failureRedirect : '/'
    }));


    // =====================================
    // GITHUB ROUTES =======================
    // =====================================
    app.get('/api/auth/github', passport.authenticate('github', { scope: [ 'user:email' ] }));

    app.get('/api/auth/github/callback', passport.authenticate('github', {
        successRedirect : '/profile',
        failureRedirect : '/'
    }));


    // =====================================
    // TWITTER ROUTES ======================
    // =====================================
    app.get('/api/auth/twitter', passport.authenticate('twitter'));

    app.get('/api/auth/twitter/callback', passport.authenticate('twitter', {
        successRedirect : '/profile',
        failureRedirect : '/'
    }));

};