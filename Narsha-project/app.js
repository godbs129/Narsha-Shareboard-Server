const express = require('express');
const app = express();
const path = require('path');
const mysql = require('./dbcon/dbcon');
const session = require('express-session');

const secret = require('./secret/session.json').secret;

//Restful API
const signup = require('./router/signup');
const signin = require('./router/signin');
const autologin = require("./router/autoLogin");
const device = require('./router/device');
const device_inquiry = require('./router/device-inquiry');
const device_delete = require("./router/device-delete");
const device_update = require("./router/device-update");
const clipboard = require('./router/clipboard');
const clipboard_inquiry = require('./router/clipboard-inquiry');
const clipboard_delete = require('./router/clipboard-delete');
const clipboard_select = require('./router/clipboard-select');

//Web Router
const index = require('./router/web/index');
const main = require('./router/web/main');
const about = require('./router/web/about');
const manual = require('./router/web/manual');


app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: secret,
    resave: false,
    saveUninitialized: true
}))

// Restful API
app.use(signup, signin, autologin, device, device_inquiry, device_delete, device_update,
    clipboard, clipboard_inquiry, clipboard_delete, clipboard_select);

//WEB Router
app.use('/', index, main, manual, about);

module.exports = app;