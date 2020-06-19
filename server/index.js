var express = require('express');
var app = express();
var http = require('http').createServer(app);
const path = require('path');

var io = require('socket.io')(http);

//-------- Starting Server with Express
let port = process.env.PORT; //To run on Heroku
if (port == null || port == "") { //To run on local host
    port = 3000;
}

http.listen(port, function(){
    console.log('listening on *:3000');
});



//Enabling express to access files in the client folder
app.use(express.static(path.join(__dirname, '/../src/client')));

//Enabling express to access files in the dist folder
app.use(express.static(path.join(__dirname, '/../dist')));


app.get('/', function(req, res){
    res.sendFile(path.resolve(__dirname + '/../src/client/index.html'));
});

//Using path.resolve
app.get('/gallery', function(req, res){
    res.sendFile(path.resolve(__dirname + '/../src/client/gallery.html'));
});

//Using path.resolve
app.get('/question1', function(req, res){
    res.sendFile(path.resolve(__dirname + '/../src/client/outsider.html'));
});





//-------- Socket.io Events
io.on('connection', function(socket){
    console.log('a user connected');

    socket.on('disconnect', function(){
        console.log('user disconnected');
    });

    socket.on('colorOut', function(msg){

        socket.broadcast.emit('updateColorInUI', msg);

        client.publish('kreativData/colorOut', msg);
        //console.log("Sucessfully published: " + msg)


    });

});
