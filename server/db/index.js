var mysql = require('mysql');
var select = require('./select.js');
var insert = require('./insert.js');

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".

exports.connection = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "chat"
});

exports.connection.connect();


// when POST request
exports.dbInsert = function(message){
  insert.postMessage(message);
}

exports.dbSelect = function(roomname, callback){
   select.getMessages(roomname, callback);
}
