const mysql = require('mysql');

const con = mysql.createPool({
    host: 'localhost',
    database: 'narsha',
    user: 'root',
    password: 'jhy040129',
    connectionLimit: 30,
    dateStrings: 'date'
});

module.exports = con;np