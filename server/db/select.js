var db = require('./index.js');

exports.getMessages = function(roomname, callback){
  var roomID = null;

  db.connection.query("SELECT * FROM rooms WHERE roomname = ?;", roomname, function(err, result){
    if(err){
      console.log(err);
      return
    } else {
      roomID = result[0].room_id;
      db.connection.query("SELECT * FROM messages WHERE room_id = ?;", roomID, function(err, result){
        if(err){
          console.log(err);
          return
        } else {
          callback(result);
        }
      });
    }
  });
}
