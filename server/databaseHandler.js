const mongoose = require('mongoose')


//For Heroku deployment
const uri = process.env.mongoDbConnection;

//For local Server
//const local = require('../../local-db.js');
//const uri = local.uri;

async function main(){

  //Connecting to the client
  const db = mongoose.connect(uri);

  console.log('Connecting to Mongo DB');

  //Get the default connection
  var connection = mongoose.connection;

  //Bind connection to error event (to get notification of connection errors)
  connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

};

module.exports.main = main;
