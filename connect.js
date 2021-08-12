const mysql = require('mysql2');

var connection = mysql.createConnection({
    host: "mysql_server",
    user: "root",
    password: "admin@2021",
    database: "bookstore",
});

connection.connect(function (err) {
    try {
        if (err) throw err;
        console.log("Connect bookstore success.");
    } catch (error) {
        console.log(err);
    }
});

module.exports = connection;