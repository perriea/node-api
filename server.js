// Framework ExpressJS
var express        = require('express');
var app            = express();

// HTTP/1.1 ou HTTP/2 (spdy)
var http           = require('http');
var spdy		   = require('spdy');

// Packages
var path           = require('path');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var cookieParser   = require('cookie-parser');
var morgan         = require("morgan");
var cors           = require('cors');
var passport       = require('passport');
var expressSession = require('express-session');
var fs             = require('fs');
var compression    = require("compression");
var helmet         = require("helmet");

// services avalaible
var colors         = require(path.join(__dirname, '/app/services/color'));
//var redis          = require(path.join(__dirname, '/app/services/redis'))


var ports = {
    http: process.env.APP_HTTP_PORT || 8080,
    https: process.env.APP_HTTPS_PORT || 4433
};

var credentials = {
    key: fs.readFileSync(path.join(__dirname, '/app/config/ssl/server.key')),
    cert: fs.readFileSync(path.join(__dirname, '/app/config/ssl/server.crt'))
};

// Locale app
app.locals.title = 'My API';
app.locals.strftime = require('strftime');
app.locals.email = 'me@myapi.com';


// configuration ===========================================

// expose favicon & robots.txt & docs
app.use('/', express.static(path.join(__dirname, '/public')));

// Show logs in console
var logDirectory = process.env.APP_PATH_LOG || path.join(__dirname, 'logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

// Access Logs
app.use(morgan(':remote-addr :remote-user [:date[web]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent - :response-time[2] ms"', {
    skip: function (req, res) { return res.statusCode > 500 },
    stream: fs.createWriteStream(path.join(logDirectory, 'access.log'))
}))

// Errors Logs
app.use(morgan(':remote-addr :remote-user [:date[web]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent - :response-time[2] ms"', {
    skip: function (req, res) { return res.statusCode < 500 },
    stream: fs.createWriteStream(path.join(logDirectory, 'error.log'))
}))

// Parse application/json 
app.use(bodyParser.json());

// Parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Read cookies (needed for auth)
app.use(cookieParser());

// Accept cross domain *
app.use(cors({
    origin: ["*"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

// Override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));

// Fast & light request
app.use(compression());

// Anti XSS
app.use(helmet());


// Init local session Passport
app.use(expressSession({
    secret: process.env.APP_SESSION_SECRET || 'RANDOM',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());


// Routes ==================================================
require(path.join(__dirname, 'app/routes'))(app, passport);
require(path.join(__dirname, 'app/services/passport'))(passport);

// Start app ===============================================
// Change http to https

console.log(colors.info('RESTful API running, PID : ' + process.pid));

// HTTP/1.1
http.createServer(function (req, res) {
    res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
    res.end();
}).listen(ports.http, () => { console.log(colors.verbose('Port serveur HTTP (API) : ' + ports.http)); });

// HTTP/2
httpsServer = spdy.createServer(credentials, app).listen(ports.https, () => { console.log(colors.verbose('Port serveur HTTPS (API) : ' + ports.https)); });

module.exports = app;