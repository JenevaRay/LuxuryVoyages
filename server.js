"use strict";
// var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
//     if (k2 === undefined) k2 = k;
//     var desc = Object.getOwnPropertyDescriptor(m, k);
//     if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
//       desc = { enumerable: true, get: function() { return m[k]; } };
//     }
//     Object.defineProperty(o, k2, desc);
// }) : (function(o, m, k, k2) {
//     if (k2 === undefined) k2 = k;
//     o[k2] = m[k];
// }));
// var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
//     Object.defineProperty(o, "default", { enumerable: true, value: v });
// }) : function(o, v) {
//     o["default"] = v;
// });
// var __importStar = (this && this.__importStar) || function (mod) {
//     if (mod && mod.__esModule) return mod;
//     var result = {};
//     if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
//     __setModuleDefault(result, mod);
//     return result;
// };
// var __importDefault = (this && this.__importDefault) || function (mod) {
//     return (mod && mod.__esModule) ? mod : { "default": mod };
// };
// Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const express = require("express");
const express_handlebars = require("express-handlebars");
const session = require("express-session");
// const controllers = require("./controllers");
// const sequelize = require('./config/connection')
const sequelize = require("./config/connection");
// const helpers = require("./utils/helpers");
const dotenv = require("dotenv");
const SessionStore = require('express-session-sequelize')(session.Store);

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;
const msPerMinute = 60 * 1000;
const sequelizeSessionStore = new SessionStore({ db: sequelize.sequelize });

app.use(session({
    secret: "process.env.SESSION_SECRET",
    resave: false,
    saveUninitialized: true,
    store: sequelizeSessionStore,
    // because we don't have HTTPS implemented...  secure is FALSE
    cookie: { secure: false, httpOnly: true, sameSite: 'strict', maxAge: msPerMinute * 10 } // Cookie expires after 10 minutes.
}));

// app.engine('handlebars', (0, express_handlebars_1.engine)({ helpers: helpers_1.helpers }));
app.engine('handlebars', express_handlebars.engine({
    // helpers: helpers
}));
app.set('view engine', 'handlebars');
app.set('views', './views');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
// app.use(controllers.router);
// app.use(require('./controllers'))
sequelize.sequelize.sync({ force: false });

app.listen(PORT, () => {
    console.log('Server listening on: http://localhost:' + PORT);
});




/**
 * Created by sazack on 6/4/17.
 */
// 'use strict';

// const express = require('express');
// const bodyParser = require('body-parser');
// const http = require('http');
// const path = require('path');
// let config = require('./config/connection');
// let routes = require('./routes');
// const database = require('./lib/database');
// import { sequelize } from './config/connection'





// let app = express();
// database.init(app)

// //Uncomment if you require template engine
// // app.set('view engine', 'pug');

// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({extended:false}));


// app.use('/',routes)


// let server = http.createServer(app);

// app.use(express.static(path.join(__dirname, 'public')))


// server.listen(config.port);

// server.on('error',(error)=>{
//     if(error.syscall !== 'listen'){
//     throw error
// }

// let bind = typeof config.port ==='string'
//     ? 'Pipe' + config.port
//     : 'port' + config.port


// switch(error.code){
//     case 'EACCES':
//         console.log(bind+ 'requires elevated privilege', {});
//         process.exit(1)
//         break;

//     case 'EADDRINUSE':
//         console.log(bind + 'is already in use');
//         process.exit(1)
//         break;

//     default:
//         throw error;
// }
// })


// server.on('listening', ()=>{
//     let addr = server.address()
//     let bind = typeof addr === 'string'
//         ? 'pipe' + addr
//         : 'port' + addr.port;
// if(process.env.Node_ENV !== 'test') {
//     console.log('Express-MVC Server listening on ' + bind, {})
// }
// })

// module.exports = app;



