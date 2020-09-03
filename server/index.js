var express = require('express');
var app = express();
var http = require('http').createServer(app);
const path = require('path');
const mongoose = require('mongoose')
var bodyParser = require('body-parser');
var io = require('socket.io')(http);
const axios = require('axios')
var Filter = require('bad-words'),
filter = new Filter();

var words = require("naughty-words");

var Schema = mongoose.Schema;
var emailsController = require('./emailsController.js');
var outsiderAssociationsController = require('./outsiderController.js');
var peripheryAssociationsController = require('./peripheryController.js');
var db = require('./databaseHandler.js');

//-------- Starting Server with Express
let port = process.env.PORT; //To run on Heroku
if (port == null || port == "") { //To run on local host
    port = 3000;
}

http.listen(port, function(){
    console.log('listening on *:3000');
});




//To filter away bad words
words.sv.forEach(function(element) { 
  filter.addWords(element);
  });

words.en.forEach(function(element) { 
  filter.addWords(element);
});

filter.addWords('hora', 'jävla', 'snopp', 'penis');






//Enabling express to access files in the client folder
app.use(express.static(path.join(__dirname, '/../src/client')));

//Enabling express to access files in the dist folder
app.use(express.static(path.join(__dirname, '/../dist')));



app.get('/', function(req, res){
    res.sendFile(path.resolve(__dirname + '/../src/client/index.html'));
});

//Using path.resolve
app.get('/fringe', function(req, res){
    res.sendFile(path.resolve(__dirname + '/../src/client/gallery.html'));
});


app.get('/gallery', function(req, res){
  res.sendFile(path.resolve(__dirname + '/../src/client/redirect.html'));
});

//Using path.resolve
app.get('/question1', function(req, res){
    res.sendFile(path.resolve(__dirname + '/../src/client/outsider.html'));
});

//Using path.resolve
app.get('/question2', function(req, res){
    res.sendFile(path.resolve(__dirname + '/../src/client/periphery.html'));
});

// Parse requests of content-type 'application/json'
app.use(bodyParser.json());

app.use('/api/emails', emailsController);
// Catch all non-error handler for api (i.e., 404 Not Found)

app.use('/api/outsiderAssociations', outsiderAssociationsController);
// Catch all non-error handler for api (i.e., 404 Not Found)

app.use('/api/peripheryAssociations', peripheryAssociationsController);
// Catch all non-error handler for api (i.e., 404 Not Found)

app.use('/api/*', function (req, res) {

    res.status(404).json({ 'message': 'Not Found' });

});


//-------- Socket.io Events
io.on('connection', function(socket){
    console.log('a user connected');

    socket.on('disconnect', function(){
        console.log('user disconnected');
    });

    socket.on('e-mailAddress', function(msg){
      //console.log('Email Adress from client is ' + msg);

      axios.post('https://radiant-ridge-37495.herokuapp.com/api/emails', {
        email: msg
      })
      .then((res) => {
        console.log(`statusCode: ${res.statusCode}`)
        //console.log(res)
      })
      .catch((error) => {
        console.error(error)
      })

    });

    socket.on('outsiderAssociation', function(msg){
      //console.log('Association from client is ' + msg);


      if(filter.isProfane(msg)){
        console.log('Elininating bad word');
      }
      else{

        axios.post('https://radiant-ridge-37495.herokuapp.com/api/outsiderAssociations', {
          association: msg
        })
        .then((res) => {
          console.log(`statusCode: ${res.statusCode}`)
          //console.log(res)
        })
        .catch((error) => {
          console.error(error)
        })

      }


    });

    socket.on('peripheryAssociation', function(msg){
      //console.log('Association from client is ' + msg);

      if(filter.isProfane(msg)){
        console.log('Elininating bad word');
      }
      else{


      axios.post('https://radiant-ridge-37495.herokuapp.com/api/peripheryAssociations', {
        association: msg
      })
      .then((res) => {
        console.log(`statusCode: ${res.statusCode}`)
        //console.log(res)
      })
      .catch((error) => {
        console.error(error)
      })

    }

    });

});


//---------- Database ---------
db.main().catch(console.error);
