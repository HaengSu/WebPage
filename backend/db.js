require('dotenv').config();

const mysql = require('mysql2');

const db = mysql.createConnection({
    host : 'localhost',
    user : process.env.MYSQL_USER,
    password : process.env.MYSQL_PASSWORD,
    database : process.env.MYSQL_DATABASE
});


db.connect(err => {
    if(err) {
        console.error('db연결 실패 : ', err);
    } else {
        console.log('MYSQL(DB) 연결 성공');
    }
})

module.exports = db;