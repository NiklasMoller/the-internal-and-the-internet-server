const mongoose = require('mongoose')


//For Heroku deployment
const uri = process.env.mongoDbConnection;

//For local Server
//const local = require('../../local-db.js');
//const uri = local.uri;

async function main(){

  //Connecting to the client
  const db = mongoose.connect(uri);

  //Bind connection to error event (to get notification of connection errors)
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));

};

module.exports.main = main;
