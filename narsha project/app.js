const express = require('express');
const app = express();
const signup = require('./router/signup');
const signin = require('./router/signin');
const autologin = require("./router/autoLogin");
const device = require('./router/device');
const device_inquiry = require('./router/device inquiry');
const mysql = require('./dbcon');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.send(
        "hello"
    )
})
app.use(signup, signin, autologin, device, device_inquiry);

module.exports = app;