var db = require('./index.js');

exports.getMessages = function(roomname, callback){
  var roomID = null;

  db.connection.query("SELECT * FROM rooms WHERE roomname = ?;", roomname, function(err, result){
    if(err){
      console.log(err);
      return
    } else {
      if(result.length === 0){
        console.log("making new room");
        db.connection.query("INSERT INTO rooms (roomname) VALUES (?);", roomname, function(err, result){
          console.log("made room, selecting messages");
          console.log(result);
          roomID = result.insertId;
          selectMessages();
        })
      } else {
        console.log("room exists, selecting messages");
        roomID = result[0].room_id;
        selectMessages();
      }
    }
  });

  var selectMessages = function(){
    db.connection.query('select messages.content, users.username, rooms.roomname' +
                        ' from messages' +
                        ' inner join users on messages.user_id = users.user_id' +
                        ' inner join rooms on messages.room_id = rooms.room_id' +
                        ' where rooms.room_id = ?', roomID, function(err, result){
      if(err){
        console.log(err);
        return
      } else {
        results = JSON.parse(JSON.stringify(result));
        console.log(results);
        callback(results);
      }
    });
  }
}
