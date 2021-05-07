const mysql = require('mysql');

const mysqlConnection =mysql.createConnection({
    connectionLimit: 10,
    password: 'root',
    user: 'root',
    database: 'rei',
    host: '127.0.0.1',
    port: 8889,
});

mysqlConnection.connect(function (err){
    if(err){
        console.log(err);
    }else{
       console.log('La base de datos esta conectada') 
    }
});

module.exports = mysqlConnection;