/* You'll need to
 * npm install sequelize
 * before running this example. Documentation is at http://sequelizejs.com/
 */

var Sequelize = require("sequelize");
var sequelize = new Sequelize("chat", "root", "");
/* TODO this constructor takes the database name, username, then password.
 * Modify the arguments if you need to */

/* first define the data structure by giving property names and datatypes
 * See http://sequelizejs.com for other datatypes you can use besides STRING. */
var User = sequelize.define('User', {
  userName: Sequelize.STRING

});

var Message = sequelize.define('Message', {
  // user_ID: Sequelize.INTEGER,
  message_text: Sequelize.STRING,
  roomName: Sequelize.STRING
});

User.hasMany(Message, {foreignKey: 'user_ID'})
Message.belongsTo(User, {foreignKey: 'user_ID'})

/* .sync() makes Sequelize create the database table for us if it doesn't
 *  exist already: */
User.sync().success(function() {
  /* This callback function is called once sync succeeds. */

  // now instantiate an object and save it:
  var newUser = User.build({userName: "Jean Valjean"});
  newUser.save().success(function() {

    /* This callback function is called once saving succeeds. */

    // Retrieve objects from the database:
    User.findAll({ where: {userName: "Jean Valjean"} }).success(function(usrs) {
      // This function is called back with an array of matches.
      for (var i = 0; i < usrs.length; i++) {
        console.log(usrs[i].userName + " exists");
      }
    });
  });
});

Message.sync().success(function(){
  var newMessage = Message.build({message_text: 'hi', roomName: 'lobby', user_ID: 2});
  newMessage.save().success(function(){
    Message.findAll({where: {"User.userName": "Jean Valjean"}, include: [User]}).success(function(msgs){
      for (var i = 0; i< msgs.length; i++){
        console.log(msgs[i].message_text)
      }
    })
  })
})
