const photos = [
  {src:'images/window_glass_1.jpeg', service:'window_glass'},
  {src:'images/mirror_1.jpeg', service:'mirror'},
  {src:'images/aluminium_1.jpeg', service:'aluminium'},
  {src:'images/glass_cutting_1.jpeg', service:'glass_cutting'},
  {src:'images/glass_grinding_1.jpeg', service:'glass_grinding'},
  {src:'images/beveling_1.jpeg', service:'beveling'},
  {src:'images/glass_film_1.jpeg', service:'glass_film'},
  {src:'images/designer_glass_1.jpeg', service:'designer_glass'},
  {src:'images/glass_partition_1.jpeg', service:'glass_partition'}
];

const videos = [
  {src:'videos/window_glass.mp4', service:'window_glass'},
  {src:'videos/mirror.mp4', service:'mirror'},
  {src:'videos/glass_partition.mp4', service:'glass_partition'}
];

const photoSlider=document.getElementById('photo-slider');
const videoSlider=document.getElementById('video-slider');

function loadMedia(service){
    photoSlider.innerHTML='';
    videoSlider.innerHTML='';
    photos.filter(p=>p.service===service).forEach(p=>{
        const img=document.createElement('img');
        img.src=p.src; img.style.width='250px'; img.style.margin='10px';
        img.addEventListener('click',()=>{
            const lightbox=document.createElement('div');
            lightbox.style.position='fixed'; lightbox.style.top='0'; lightbox.style.left='0';
            lightbox.style.width='100%'; lightbox.style.height='100%';
            lightbox.style.background='rgba(0,0,0,0.95)'; lightbox.style.display='flex';
            lightbox.style.justifyContent='center'; lightbox.style.alignItems='center'; lightbox.style.cursor='pointer'; lightbox.style.zIndex='9999';
            const imgBox=document.createElement('img'); imgBox.src=p.src; imgBox.style.maxWidth='90%'; imgBox.style.maxHeight='90%';
            lightbox.appendChild(imgBox); document.body.appendChild(lightbox);
            lightbox.addEventListener('click',()=>lightbox.remove());
        });
        photoSlider.appendChild(img);
    });
    videos.filter(v=>v.service===service).forEach(v=>{
        const vid=document.createElement('video'); vid.src=v.src; vid.controls=true; vid.style.width='300px'; vid.style.margin='10px';
        videoSlider.appendChild(vid);
    });
}

document.querySelectorAll('.service-box').forEach(box=>{box.addEventListener('click',()=>{loadMedia(box.dataset.service);});});

if(document.querySelector('.service-box')){ loadMedia(document.querySelector('.service-box').dataset.service); }

// Custom review system
const reviewForm=document.getElementById('review-form');
const reviewsDisplay=document.getElementById('reviews-display');
let reviews=[];
reviewForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const name=document.getElementById('name').value;
    const rating=document.getElementById('rating').value;
    const message=document.getElementById('message').value;
    const photo=document.getElementById('photo').files[0];
    let reader=new FileReader();
    reader.onload=function(){ 
        reviews.push({name,rating,message,photo:reader.result});
        displayReviews();
    };
    if(photo){reader.readAsDataURL(photo);} else {reviews.push({name,rating,message,photo:null}); displayReviews();}
    reviewForm.reset();
});
function displayReviews(){ reviewsDisplay.innerHTML=''; reviews.forEach(r=>{
    const div=document.createElement('div'); div.className='review-card';
    div.innerHTML=`<strong>${r.name}</strong> - ${'★'.repeat(r.rating)}<p>${r.message}</p>${r.photo?'<img src="'+r.photo+'" style="width:100px;margin-top:5px;border-radius:8px;">':''}`;
    reviewsDisplay.appendChild(div);
}); }
const canvas=document.getElementById('particles');
const ctx=canvas.getContext('2d');
canvas.width=window.innerWidth;
canvas.height=250;
let particlesArray=[];
const colors=['#A8D5BA','#F3E5D8'];
class Particle{
  constructor(){ this.x=Math.random()*canvas.width; this.y=Math.random()*canvas.height; this.size=Math.random()*3+1; this.speedX=Math.random()*1-0.5; this.speedY=Math.random()*1-0.5; this.color=colors[Math.floor(Math.random()*colors.length)];}
  update(){ this.x+=this.speedX; this.y+=this.speedY; if(this.x<0||this.x>canvas.width)this.speedX*=-1; if(this.y<0||this.y>canvas.height)this.speedY*=-1;}
  draw(){ ctx.fillStyle=this.color; ctx.beginPath(); ctx.arc(this.x,this.y,this.size,0,Math.PI*2); ctx.fill();}
}
function init(){particlesArray=[];for(let i=0;i<80;i++){particlesArray.push(new Particle());}}
function animate(){ctx.clearRect(0,0,canvas.width,canvas.height);particlesArray.forEach(p=>{p.update();p.draw();});requestAnimationFrame(animate);}
init(); animate();
window.addEventListener('resize',()=>{canvas.width=window.innerWidth;canvas.height=250;init();});
