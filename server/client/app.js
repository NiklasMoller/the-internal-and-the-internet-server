var red = JSON.stringify({
    "R" : 255,
    "G" : 0,
    "B" : 0
});

var green = JSON.stringify({
    "R" : 0,
    "G" : 255,
    "B" : 0
});

var blue = JSON.stringify({
    "R" : 0,
    "G" : 0,
    "B" : 255
});



var socket = io();

function colorOut(color){
    socket.emit('colorOut', color);
    console.log("Sending color out of type " + color)
}

socket.on('updateColorInUI', function(msg){
    console.log(msg);
});
