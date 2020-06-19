var socket = io();

function colorOut(color){
    socket.emit('colorOut', color);
    console.log("Sending color out of type " + color)
}

socket.on('updateColorInUI', function(msg){
    console.log(msg);
});
