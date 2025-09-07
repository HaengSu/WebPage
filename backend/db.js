const mysql = require('mysql2');

const db = mysql.createConnection({
    host : 'localhost',
    user : 'pickaword_admin',
    password : 'pickaword000',
    database : 'pickaword'
});


db.connect(err => {
    if(err) {
        console.error('db연결 실패 : ', err);
    } else {
        console.log('MYSQL(DB) 연결 성공');
    }
})

module.exports = db;