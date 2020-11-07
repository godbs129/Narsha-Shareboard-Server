const mysql = require('mysql');

const con = mysql.createPool({
    host: 'localhost',
    database: 'shareboard',
    user: 'root',
<<<<<<< HEAD
    password: 'jhy040129',
    connectionLimit: 30,
    dateStrings: 'date'
=======
    password: 'pure6671',
    connectionLimit: 30
>>>>>>> db20ebc8f74d630050f9a8042b149d37f01069af
});

module.exports = con;