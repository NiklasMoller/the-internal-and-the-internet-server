var socket = io();

var n = 0;

var animation = bodymovin.loadAnimation({
  container: document.getElementById('bm'),
  renderer: 'svg',
  loop: false,
  autoplay: true,
  path: './resources/animations/outsider.json',
  initialSegment: [1,700]
})

function buttonPressed(){
  var message = document.getElementById("myInput").value;
  //console.log('message is' + message);
  document.getElementById('myInput').value = ' ';

  if(n === 0){
    animation.playSegments([1080, 1500], false);
    document.getElementById('myInput').type="email";

    socket.emit('outsiderAssociation', message);
  }
  else if (n > 0){
    console.log('Pressed another time');

    
      if (validateEmail(message)) {
        
        animation.playSegments([1575, 1900], false);
        socket.emit('e-mailAddress', message);

      } else {

        console.log('Not an valid e-mail');

      }




  }

  n = n + 1;

}

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
