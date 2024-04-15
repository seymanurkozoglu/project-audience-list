const mysql = require('mysql');

// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Zr71GH0ndJyOPWv' ;
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Zr71GH0ndJyOPWv",
    database: "project_db"
})

db.connect(function(err) {
    if (err) {
        console.error('MySQL bağlantısı başarısız: ', err);
      } else {
        console.log('MySQL bağlantısı başarılı');
      }
  });

module.exports = db;
