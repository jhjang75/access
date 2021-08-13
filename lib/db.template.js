// - Yunee Inventory, 08/07/2021~ -
var mysql = require('mysql');
var db = mysql.createConnection({
  host     : '',
  user     : '',
  password : '',
  database : ''
});
db.connect();
module.exports = db;