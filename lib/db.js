// - Yunee Inventory, 08/07/2021~ -
var mysql = require('mysql');
var con = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'jh4911721',
  database : 'inventory'
});
con.connect();
module.exports = con;