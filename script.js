// 3D Animated Particle Background
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const colors = ['#5f9ea0','#a0c4ff','#128C7E','#25D366'];
const particles = [];
for(let i=0;i<180;i++){
  particles.push({
    x: Math.random()*canvas.width,
    y: Math.random()*canvas.height,
    r: Math.random()*2+1,
    dx: (Math.random()-0.5)*1,
    dy: (Math.random()-0.5)*1,
    color: colors[Math.floor(Math.random()*colors.length)]
  });
}

function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  for(let p of particles){
    ctx.beginPath();
    ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fillStyle=p.color;
    ctx.fill();
    p.x += p.dx; p.y += p.dy;
    if(p.x<0||p.x>canvas.width) p.dx*=-1;
    if(p.y<0||p.y>canvas.height) p.dy*=-1;
  }
  requestAnimationFrame(animate);
}
animate();

// Slide Gallery + Videos
const gallery = document.getElementById('gallery-container');
const slideGallery = document.querySelector('.slide-gallery') || gallery;

const mediaFiles = [
  'images/photo1.jpg',
  'images/photo2.jpg',
  'videos/video1.mp4',
  'videos/video2.mp4'
];

const lightbox = document.getElementById('lightbox-overlay');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxVideo = document.getElementById('lightbox-video');
const closeBtn = document.getElementById('lightbox-close');

mediaFiles.forEach(file=>{
  let el;
  if(file.endsWith('.jpg')||file.endsWith('.png')){
    el=document.createElement('img'); el.src=file;
  } else if(file.endsWith('.mp4')){
    el=document.createElement('video'); el.src=file; el.controls=true;
  }
  el.addEventListener('click', ()=>{
    lightbox.style.display='flex';
    if(file.endsWith('.mp4')){
      lightboxImg.style.display='none';
      lightboxVideo.style.display='block';
      lightboxVideo.src=file;
      lightboxVideo.play();
    } else {
      lightboxVideo.style.display='none';
      lightboxImg.style.display='block';
      lightboxImg.src=file;
    }
  });
  slideGallery.appendChild(el);
});

closeBtn.addEventListener('click', ()=>{
  lightbox.style.display='none';
  lightboxVideo.pause();
});
