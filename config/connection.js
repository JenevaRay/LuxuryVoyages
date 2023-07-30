"use strict";
const Sequelize = require("sequelize");
require('dotenv').config()

let sequelize;
// eslint-disable-next-line no-undef
if (process.env.JAWSDB_URL) {
    exports.sequelize = sequelize = new Sequelize(process.env.JAWSDB_URL); // eslint-disable-line no-undef
}
else {
    exports.sequelize = sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, { // eslint-disable-line no-undef
        // logging: (str)=>{console.log(str)},
        host: 'localhost',
        dialect: 'mysql',
        port: 3306
    });
}

module.exports = sequelize;