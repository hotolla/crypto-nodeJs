const mysql = require('mysql2');
const fs = require('fs');

const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
});

// let sql = `INSERT INTO users (name, email) VALUES('user2', '2')`;
//
// connection.query(sql, function(err, results) {
//   if(err) console.log(err);
//   else console.log('Work!');
// });

// const jsonData = fs.readFileSync('data.json', 'utf8');
// const users = JSON.parse(jsonData);
// users.forEach(user => {
//   const { name, email, password, confirmPassword } = user;
//    sql = `INSERT INTO users (name, email, password, confirmPassword) VALUES (?, ?, ?, ?)`;
//   connection.query(sql, [name, email, password, confirmPassword], (error, results, fields) => {
//     if (error) throw error;
//     console.log('Added user: ', user);
//   });
// });
connection.end();
