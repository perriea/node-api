var db = require('../../config/db');
var Type_connect = require('./type_connect');
var Role = require('./role');

var bcrypt = require('bcrypt');

var sequelize = db.sequelize,
    access = db.access;

var methods = { generateHash: null, validPassword: null };

var TUsers = access.define('c_users', {
    lastname: {
        type: access.Sequelize.STRING(100),
        allowNull: false,
        validate: {
            isAlphanumeric: true
        }
    },
    firstname: {
        type: access.Sequelize.STRING(100),
        allowNull: false,
        validate: {
            isAlphanumeric: true
        }
    },
    gender: {
        type: access.Sequelize.STRING(1),
        allowNull: false
    },
    email: {
        type: access.Sequelize.STRING(100),
        allowNull: true,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: access.Sequelize.STRING(255),
        allowNull: true
    },
    authenticate_type: {
        type: access.Sequelize.INTEGER(1),
        allowNull: false,
    },
    role: {
        type: access.Sequelize.INTEGER(4),
        allowNull: false,
        defaultValue: 4,
    }
});

// methods ======================
// generating a hash
methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

// checking if password is valid
methods.validPassword = function(password, user) {
    return bcrypt.compareSync(password, user.password, null);
};

Type_connect.sync();
Role.sync();

Role.hasOne(TUsers, {onDelete: 'SET NULL'});
Type_connect.hasOne(TUsers, {onDelete: 'SET NULL'});

TUsers.sync();

module.exports = { TUsers, methods };