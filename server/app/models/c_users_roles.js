var db = require('../../config/db');

var sequelize = db.sequelize,
    access = db.access;

var Role = access.define('c_role', {
    role: {
        type: access.Sequelize.STRING(50),
        allowNull: false
    }
}, { timestamps: false });

module.exports = Role;
