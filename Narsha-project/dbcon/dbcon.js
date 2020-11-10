const mysql = require('mysql');

const con = mysql.createPool({
    host: 'localhost',
    database: 'narsha',
    user: 'root',
    password: '12345',
    connectionLimit: 30,
    dateStrings: 'date'
});

module.exports = con;