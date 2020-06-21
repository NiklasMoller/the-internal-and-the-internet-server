const mongoose = require('mongoose')


//For Heroku deployment
const uri = process.env.mongoDbConnection;

//For local Server
//const local = require('../../local-db.js');
//const uri = local.uri;

async function main(){

  //Connecting to the client
  const db = mongoose.connect(uri)

};

module.exports.main = main;
