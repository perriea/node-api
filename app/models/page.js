var db = require('../../config/db');

var sequelize = db.sequelize,
    access = db.access;

var Page = access.define('c_page', {
    name: {
        type: access.Sequelize.STRING(50),
        allowNull: false
    }
}, { timestamps: false });

module.exports = Page;
