var app = require('express')();
var http = require('http').createServer(app);

var io = require('socket.io')(http);


http.listen(3000, function(){
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
