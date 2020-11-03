const express = require('express');
const app = express();
const signup = require('./router/signup');
const mysql = require('./dbcon');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.get('/', (req, res)=>{
    res.send(
        "hello"
    )
})
app.use(signup);

module.exports = app;