
var socket = io();

var animation = bodymovin.loadAnimation({
  container: document.getElementById('bm'),
  renderer: 'svg',
  loop: false,
  autoplay: true,
  path: './resources/animations/outsider.json',
  initialSegment: [1,700]
})



/*
Sätt en snygg styling med marginaler etc.

Efter försts click, sätt form
input type="email"



*/

var n = 0;

function buttonPressed(){
  var message = document.getElementById("myInput").value;
  console.log('message is' + message);
  document.getElementById('myInput').value = ' ';

  if(n === 0){
    animation.playSegments([1080, 1500], false);
    document.getElementById('myInput').type="email";

    socket.emit('association', message);
  }
  else if (n === 1){
    console.log('Pressed another time');
    animation.playSegments([1575, 1900], false);

    socket.emit('e-mailAddress', message);
  }

  n = n + 1;

  console.log('Current frame is ' + animation.currentFrame);


}
