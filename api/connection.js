var mysql = require('mysql');

const databaseCredentials = {
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database:process.env.database
};

const connection = mysql.createConnection(databaseCredentials);

connection.connect(function(error){
  if(error){
    console.log('Error : '+error.stack);
  } else {
    console.log('connected');
  }
});

module.exports = connection;
