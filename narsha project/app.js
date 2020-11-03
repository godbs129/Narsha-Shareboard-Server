const express = require('express');
const app = express();
const signup = require('./router/signup');
const signin = require('./router/signin');
const autologin = require("./router/autoLogin");
const device = require('./router/device');
const mysql = require('./dbcon');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.send(
        "hello"
    )
})
app.use(signup, signin, autologin, device);

module.exports = app;