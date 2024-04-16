const mysql = require('mysql');

// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Zr71GH0ndJyOPWv' ;
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
})

db.connect(function(err) {
    if (err) {
        console.error('MySQL bağlantısı başarısız: ', err);
      } else {
        console.log('MySQL bağlantısı başarılı');
      }
  });

module.exports = db;
