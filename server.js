"use strict";
const express = require("express");
const express_handlebars = require("express-handlebars");
const session = require("express-session");
const sequelize = require("./config/connection");
const dotenv = require("dotenv");
const SessionStore = require('express-session-sequelize')(session.Store);
const router = require ('./controllers')

dotenv.config();
// because process.env.PORT is defined by the line above and if it's not present, it defaults to 3001.
// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3001;

const app = express();
const msPerMinute = 60 * 1000;
const sequelizeSessionStore = new SessionStore({ db: sequelize });

app.use(session({
    secret: "process.env.SESSION_SECRET",
    resave: false,
    saveUninitialized: true,
    store: sequelizeSessionStore,
    cookie: { secure: false, httpOnly: true, sameSite: 'strict', maxAge: msPerMinute * 10 } // Cookie expires after 10 minutes.
}));

app.engine('handlebars', express_handlebars.engine({
    // helpers: helpers
}));
app.set('view engine', 'handlebars');
app.set('views', './views');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(router)

sequelize.sync({ force: false });

app.listen(PORT, () => {
    console.log('Server listening on: http://localhost:' + PORT);
});
