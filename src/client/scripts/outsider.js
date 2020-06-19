var animation = bodymovin.loadAnimation({
  container: document.getElementById('bm'),
  renderer: 'svg',
  loop: false,
  autoplay: true,
  path: './resources/animations/outsider.json'
})



/*
function playVackert(){
    anim.goToAndStop(vackertInFrame, true);
    setTimeout(function(){ anim.goToAndPlay(vackertInFrame, true); }, 4000);
}

animation.currentFrame
*/

animation.addEventListener('enterFrame', () => {
  console.log('enterFrame', anim.currentFrame);
  if(animation.currentFrame == 926)
  {
  console.log('animation stop')
  }
});

function buttonPressed(){
  var message = document.getElementById("myInput").value;

  console.log('Current frame is ' + animation.currentFrame);
      animation.goToAndPlay(1600, true);

}
