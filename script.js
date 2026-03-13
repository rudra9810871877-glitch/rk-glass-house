const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
for(let i=0;i<120;i++){
  particles.push({x:Math.random()*canvas.width, y:Math.random()*canvas.height, r:Math.random()*2 +1, dx:(Math.random()-0.5)*1, dy:(Math.random()-0.5)*1});
}

function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  for(let p of particles){
    ctx.beginPath();
    ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fillStyle='rgba(30,144,255,0.7)';
    ctx.fill();
    p.x += p.dx; p.y += p.dy;
    if(p.x<0||p.x>canvas.width) p.dx*=-1;
    if(p.y<0||p.y>canvas.height) p.dy*=-1;
  }
  requestAnimationFrame(animate);
}
animate();

const gallery = document.getElementById('gallery-container');
const mediaFiles = ['images/photo1.jpg','images/photo2.jpg','images/photo3.jpg','videos/video1.mp4'];
mediaFiles.forEach(file=>{
  if(file.endsWith('.jpg')||file.endsWith('.png')){
    const img = document.createElement('img'); img.src=file; gallery.appendChild(img);
  } else if(file.endsWith('.mp4')){
    const vid = document.createElement('video'); vid.src=file; vid.controls=true; gallery.appendChild(vid);
  }
});
