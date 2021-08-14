// - Yunee Inventory, 08/07/2021~ -
var mysql = require('mysql');
var con = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'inventory'
});
con.connect();
module.exports = con;
