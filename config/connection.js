"use strict";
// Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require("sequelize");
require('dotenv').config()

let sequelize;
if (process.env.JAWSDB_URL) {
    exports.sequelize = sequelize = new sequelize_1.Sequelize(process.env.JAWSDB_URL);
}
else {
    exports.sequelize = sequelize = new sequelize_1.Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
        host: 'localhost',
        dialect: 'mysql',
        port: 3306
    });
}

module.exports = sequelize;