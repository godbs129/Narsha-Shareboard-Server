const mysql = require('mysql');

const con = mysql.createPool({
    host: '10.80.163.222',
    database: 'narsha',
    user: 'root',
    password: 'jhy040129',
    connectionLimit: 30
});

module.exports = con;