const mysql = require('mysql');

const con = mysql.createPool({
    host: 'localhost',
    database: 'shareboard',
    user: 'root',
    password: 'pure6671',
    connectionLimit: 30,
    dateStrings: 'date'
});

module.exports = con;np