var mysql = require('mysql');
// var mysql = require('mysql');
/* If the node mysql module is not found on your system, you may
 * need to do an "sudo npm install -g mysql". */

/* You'll need to fill the following out with your mysql username and password.
 * database: "chat" specifies that we're using the database called
 * "chat", which we created by running schema.sql.*/
var dbConnection = mysql.createConnection({
  user: "root",
  password: "smartwater",
  database: "chat"
});

dbConnection.connect();
/* Now you can make queries to the Mysql database using the
 * dbConnection.query() method.
 * See https://github.com/felixge/node-mysql for more details about
 * using this module.*/




exports.findAllMessages = function(cb){
  //query: select * from messages
  dbConnection.query('SELECT*FROM messages', function(err, result){
    console.log("from inside the select: ", result)
    cb();
  });
};

exports.findAllMessages(function(){
  console.log('success')
});

exports.findUser = function(username, cb){
  dbConnection.query('SELECT ?? FROM ?? WHERE userName = ?', ['userName', 'users', username], function(err, result){
    cb(result);
  });
};

exports.saveUser = function(username, cb){
    //Take userID and push to messages
  dbConnection.query('INSERT INTO users SET ?', {userName: username}, function(err, result){
    var lookupID = result.insertId
    dbConnection.query('SELECT*FROM users WHERE user_ID = ?', [lookupID], function(err, result){
      cb(result);
    });
  });
};


exports.saveMessage = function(message, userid, roomname, cb){
  //Insert username to user table
    var insertObj = {
      message_text: message,
      user_ID: userid,
      roomName: roomname
    }
    console.log('insert obj: ', insertObj)
    dbConnection.query('INSERT INTO messages SET ?', insertObj, function(err, result){
      console.log('Insert into results from saveMessage ',result);
      // console.log('from inside saveMessage: ',result)
      cb();
    });
  //Take userID
  //Add userID to message table
};

