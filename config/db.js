// config/database.js
var Sequelize = require('sequelize');

var sequelize = new Sequelize('test', 'root', '', { 
	host: 'localhost',
	port: 3306,
	dialect: 'mysql', 
	pool: { 
		max: 5, 
		min: 0, 
		idle: 10000
	}
});

var db = {};
db.access = sequelize;
db.sequelize = Sequelize;

module.exports = db;