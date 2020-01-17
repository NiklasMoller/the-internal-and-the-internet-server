var app = require('express')();
var http = require('http').createServer(app);

var io = require('socket.io')(http);

var mqtt = require('mqtt');

//-------- Starting Server with Express
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




//------------- MQTT PubSub
/* Flespi - never used this one
var client  = mqtt.connect('wss://mqtt.flespi.io',{
    protocolVersion: 5,
    username: 'FlespiToken '
});
*/

//Free mqtt broker
var client  = mqtt.connect('mqtt://broker.hivemq.com:1883 ',{
});

//Called when client is connected
client.on('connect', function () {
    console.log('Status: Publisher is connected to broker')
});

//Called when client is disconnected
client.on('disconnect', function () {
    console.log('Status: Publisher has been disconnected')
})

//Called when client is reconnecting
client.on('reconnect', function () {
    console.log('Status: Publisher is reconnecting')
})

//Called when client is offline
client.on('offline', function () {
    console.log('Status: Publisher is offline')
    client.reconnect();
})

client.on('error', function (error) {
    console.log(error)
})





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




