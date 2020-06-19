var animation = bodymovin.loadAnimation({
  container: document.getElementById('bm'),
  renderer: 'svg',
  loop: false,
  autoplay: true,
  path: './resources/animations/outsider.json'
})

console.log('Playing outsider animation');
