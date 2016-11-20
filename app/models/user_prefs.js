var db = require('../../config/db');

var sequelize = db.sequelize,
    access = db.access;

var Pref = access.define('c_user_prefs', {
    user_id: {
        type: access.Sequelize.INTEGER(5),
        allowNull: false
    },
    page: {
        type: access.Sequelize.STRING(50),
        allowNull: false
    },
    options: {
        type: access.Sequelize.STRING(1000),
        allowNull: false
    }
}, { timestamps: true });

module.exports = Pref;
