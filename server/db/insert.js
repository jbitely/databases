var db = require('./index.js');
var Sequelize = require("sequelize");
var Promise = require("bluebird");
var join = Promise.join;

// post message function

exports.postMessage = function(message){

  var getUsername = function(){
    return (db.User.findOrCreate({where: {'username': message.username}}));
  };
  var getRoomname = function(){
    return db.Room.findOrCreate({where: {'roomname': message.roomname}})
  };

  join(getUsername(), getRoomname(), function(username, roomname){
    var user_id = JSON.parse(JSON.stringify(username))[0].id;
    var room_id = JSON.parse(JSON.stringify(roomname))[0].id;
    db.Message.findOrCreate({where: {content: message.content, room_id: room_id, user_id: user_id}})
  })
}
//   db.User.sync()
//     .then(function(){

//     })
//     .then(function(user){
//       return JSON.parse(JSON.stringify(user));
//     })
//     .then(db.Room.sync())
//     .then(function(user){

//     })
//     // .then(db.Message.sync())
//     .then(function(stuff){
//       console.log(stuff);
//       // console.log("STUFF2: ", JSON.parse(JSON.stringify(user.room[0])));
//       // db.Message.findOrCreate({where: {content: message.content, room_id: stuff.room.dataValues.id, user_id: stuff.user.dataValues.id}})
//     })
// }
// }
// }


var testmessage = {content: "some other stuff", username: "Noel2", roomname: "someroom2"}

exports.postMessage(testmessage);
  // var userid = null;
  // var roomid = null;

  // var lookupUser = function(){
  //   db.connection.query("SELECT * FROM users WHERE username = ?;", message.username, function(err, result){
  //     if(err){
  //       console.log(err);
  //       return
  //     } else {
  //       if(result.length === 0){
  //         db.connection.query("INSERT INTO users (username) VALUES (?);", message.username, function(err, result){
  //           if(err){
  //             console.log(err);
  //             return
  //           } else {
  //             userid = result.insertId;
  //             lookupRoom()
  //           }
  //         })
  //       } else {
  //         userid = result[0].user_id;
  //         lookupRoom()
  //       }
  //     }
  //   })
  // }

  // var lookupRoom = function(){
  //   db.connection.query("SELECT * FROM rooms WHERE roomname = ?;", message.roomname, function(err, result){
  //     if(err){
  //       console.err(err);
  //       return
  //     } else {
  //       if(result.length === 0){
  //         db.connection.query("INSERT INTO rooms (roomname) VALUES (?);", message.roomname, function(err, result){
  //         if(err){
  //           console.log(err);
  //           return
  //         } else {
  //           roomid = result.insertId;
  //           insertMessage()
  //         }
  //         })
  //        } else {
  //         roomid = result[0].room_id;
  //         insertMessage()
  //       }
  //     }
  //   })
  // }

  // var insertMessage = function(){
  //   db.connection.query("INSERT INTO messages SET ?", {"content": message.content, "user_id": userid, "room_id": roomid}, function(err, result){
  //     if(err){
  //       console.log(err);
  //       return
  //     } else {
  //       console.log(result);
  //     }
  //   })
  // }

  // lookupUser();


// var message = {
//   content : "test content 4",
//   username: "Justin",
//   roomname: "test room 2"
// }

// postMessage(message);
