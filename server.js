"use strict";
const express = require("express");
const express_handlebars = require("express-handlebars");
const session = require("express-session");
const sequelize = require("./config/connection");
const dotenv = require("dotenv");
const SessionStore = require("express-session-sequelize")(session.Store);
const router = require("./controllers");

dotenv.config();
const PORT = process.env.PORT || 3001; // eslint-disable-line no-undef

const app = express();
const msPerMinute = 60 * 1000;
const sequelizeSessionStore = new SessionStore({ db: sequelize });

app.use(
  session({
    secret: process.env.SESSION_SECRET, // eslint-disable-line no-undef
    resave: false,
    saveUninitialized: false,
    unset: 'destroy',
    store: sequelizeSessionStore,
    cookie: {
      secure: true,
    //   httpOnly: true,
      sameSite: "strict",
      maxAge: msPerMinute * 60,
    }, // Cookie expires after 60 minutes.
  }),
);

app.engine(
  "handlebars",
  express_handlebars.engine({
    // helpers: helpers
  }),
);
app.set("view engine", "handlebars");
app.set("views", "./views");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(router);

sequelize.sync({ force: false });

app.listen(PORT, () => {
  console.log("Server listening on: http://localhost:" + PORT);
});
