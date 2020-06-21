var socket = io();

var n = 0;

var animation = bodymovin.loadAnimation({
  container: document.getElementById('bm'),
  renderer: 'svg',
  loop: false,
  autoplay: true,
  path: './resources/animations/periphery.json',
  initialSegment: [1,700]
})

function buttonPressed(){
  var message = document.getElementById("myInput").value;
  //console.log('message is' + message);
  document.getElementById('myInput').value = ' ';

  if(n === 0){
    animation.playSegments([1080, 1500], false);
    document.getElementById('myInput').type="email";

    socket.emit('peripheryAssociation', message);
  }
  else if (n === 1){

    animation.playSegments([1575, 1900], false);

    socket.emit('e-mailAddress', message);
  }

  n = n + 1;

}
