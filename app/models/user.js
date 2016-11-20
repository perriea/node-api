var db = require('../../config/db');
var Type_connect = require('./user_auth_type');
var Role = require('./user_role');
var Pref = require('./user_prefs');

var bcrypt = require('bcrypt');

var sequelize = db.sequelize,
    access = db.access;

var methods = {
    generateHash: null,
    validPassword: null
};

var TUsers = access.define('c_user', {

    authenticate_id: {
        type: access.Sequelize.INTEGER(1),
        allowNull: false,
    },
    role_id: {
        type: access.Sequelize.INTEGER(4),
        allowNull: false,
        defaultValue: 4,
    },
    email: {
        type: access.Sequelize.STRING(200),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: access.Sequelize.STRING(255),
        allowNull: true
    }
}, { timestamps: false });

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
Pref.sync();

Role.hasOne(TUsers, { foreignKey : 'role_id', onDelete: 'NO ACTION' });
Type_connect.hasOne(TUsers, { foreignKey : 'authenticate_id', onDelete: 'NO ACTION' });
//Pref.hasOne(TUsers, { foreignKey : 'id', onDelete: 'NO ACTION' });

TUsers.sync();

module.exports = { TUsers, Pref, Type_connect, Role, methods };