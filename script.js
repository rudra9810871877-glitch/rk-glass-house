// 3D Particle Background
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const colors = ['#5f9ea0','#b0c4de','#128C7E','#25D366'];
const particles = [];
for(let i=0;i<150;i++){
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

// Separate Photo and Video Galleries
const photoContainer = document.getElementById('photo-container');
const videoContainer = document.getElementById('video-container');

// Media files with service tags
const photos = [
  {src:'images/photo1.jpg', service:'window'},
  {src:'images/photo2.jpg', service:'mirror'},
  {src:'images/photo3.jpg', service:'designer'}
];
const videos = [
  {src:'videos/video1.mp4', service:'designer'},
  {src:'videos/video2.mp4', service:'partition'}
];

const lightbox = document.getElementById('lightbox-overlay');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxVideo = document.getElementById('lightbox-video');
const closeBtn = document.getElementById('lightbox-close');

// Function to render photos
function renderPhotos(filteredPhotos){
  photoContainer.innerHTML='';
  filteredPhotos.forEach(file=>{
    const img=document.createElement('img');
    img.src=file.src;
    img.addEventListener('click', ()=>{
      lightbox.style.display='flex';
      lightboxVideo.style.display='none';
      lightboxImg.style.display='block';
      lightboxImg.src=file.src;
    });
    photoContainer.appendChild(img);
  });
}

// Function to render videos
function renderVideos(filteredVideos){
  videoContainer.innerHTML='';
  filteredVideos.forEach(file=>{
    const vid=document.createElement('video');
    vid.src=file.src;
    vid.controls=true;
    vid.addEventListener('click', ()=>{
      lightbox.style.display='flex';
      lightboxImg.style.display='none';
      lightboxVideo.style.display='block';
      lightboxVideo.src=file.src;
      lightboxVideo.play();
    });
    videoContainer.appendChild(vid);
  });
}

// Initial render all
renderPhotos(photos);
renderVideos(videos);

// Service click filter
const serviceBoxes = document.querySelectorAll('.service');
serviceBoxes.forEach(box=>{
  box.addEventListener('click', ()=>{
    const service = box.getAttribute('data-service');
    const filteredPhotos = photos.filter(p=>p.service===service);
    const filteredVideos = videos.filter(v=>v.service===service);
    renderPhotos(filteredPhotos);
    renderVideos(filteredVideos);
    window.scrollTo({top:document.getElementById('photo-gallery').offsetTop-50, behavior:'smooth'});
  });
});

// Lightbox Close
closeBtn.addEventListener('click', ()=>{
  lightbox.style.display='none';
  lightboxVideo.pause();
});
