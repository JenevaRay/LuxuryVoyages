"use strict";
const Sequelize = require("sequelize");
require("dotenv").config();

let sequelize;
// eslint-disable-next-line no-undef
if (process.env.JAWSDB_URL) {
  exports.sequelize = sequelize = new Sequelize(process.env.JAWSDB_URL); // eslint-disable-line no-undef
} else {
  exports.sequelize = sequelize = new Sequelize(
    process.env.DB_NAME, // eslint-disable-line no-undef
    process.env.DB_USER, // eslint-disable-line no-undef
    process.env.DB_PASSWORD, // eslint-disable-line no-undef
    {
      // eslint-disable-line no-undef
      // logging: (str)=>{console.log(str)},
      dialect: "mysql",
      host: process.env.DB_HOST, // eslint-disable-line no-undef
      port: process.env.DB_PORT, // eslint-disable-line no-undef
    },
  );
}

module.exports = sequelize;
