// Importing the mysql2 library
const mysql = require('mysql2');

// Declaring a variable to store the port number
const PORT = process.env.PORT || 3001;

// Setting up a MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'employee_db'
});

// Exporting the connection for use in other parts of the application
module.exports = db;