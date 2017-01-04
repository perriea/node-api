var express        = require('express');
var http           = require('http');
var https          = require('https');

var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var cookieParser   = require('cookie-parser');
var morgan         = require("morgan");
var cors           = require('cors');
var passport       = require('passport');
var expressSession = require('express-session');
var fs             = require('fs');
var favicon        = require('serve-favicon');
var compression    = require("compression");
var helmet         = require("helmet");
var app            = express();

var colors         = require(__dirname + '/config/color');
var error          = require(__dirname + '/app/controllers/error');

// var
var ports = { http: 8080, https: 4433 };
var httpServer = null;
var httpsServer = null;
var credentials = {
	key: fs.readFileSync(__dirname + '/config/ssl/key.pem'),
	cert: fs.readFileSync(__dirname + '/config/ssl/cert.pem')
};


// var locale app
app.locals.title = 'My App';
app.locals.strftime = require('strftime');
app.locals.email = 'me@myapp.com';


// configuration ===========================================

// show logs in console
app.use(morgan("common"));

// Recuperation des POST
// parse application/json 
app.use(bodyParser.json()); 

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// read cookies (needed for auth)
app.use(cookieParser());

// accept cross domain *
app.use(cors({
	origin: ["*"],
	methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
	allowedHeaders: ["Content-Type", "Authorization"]
}));

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));

// favicon
app.use(express.static(__dirname + '/public'));
app.use(favicon(__dirname + '/public/favicon.ico'));

// compression => fast and light request
app.use(compression());

// anti XSS
app.use(helmet());


// auth

// init de session Passport
app.use(expressSession({
	secret: 'RANDOM',
	resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());


// routes ==================================================
require('./app/routes')(app, passport, error); // configure our routes
require('./config/passport')(passport);

// start app ===============================================
// pass http to https
/*httpServer = http.createServer(function (req, res) {
	res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
	res.end();
}).listen(ports.http);*/

// Indep http
httpServer = http.createServer(app).listen(ports.http);

// Indep https
httpsServer = https.createServer(credentials, app).listen(ports.https);


// Affichage des infos
console.log(colors.info('RESTful API running ...'));
console.log(colors.verbose('Port serveur HTTP (API) : ' + ports.http));
console.log(colors.verbose('Port serveur HTTPS (API) : ' + ports.https));

// expose app           
exports = module.exports = app;