var app = require('express')();
var http = require('http').createServer(app);

var io = require('socket.io')(http);


let port = process.env.PORT; //To run on Heroku
if (port == null || port == "") { //To run on local host
    port = 3000;
}

http.listen(port, function(){
    console.log('listening on *:3000');
});

app.get('/', function(req, res){
    res.sendFile(__dirname + '/client/index.html');
});


io.on('connection', function(socket){
    console.log('a user connected');

    socket.on('disconnect', function(){
        console.log('user disconnected');
    });

    socket.on('colorOut', function(msg){

        socket.broadcast.emit('updateColorInUI', msg);

        console.log('colorOut: ' + msg);
    });

});
