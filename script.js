
// Photos Array
const photos = [
  {src:'images/aluminium_work_1.jpeg', service:'aluminium'},
  {src:'images/glass_1.jpeg', service:'glass'},
  {src:'images/glass_partition_1.jpeg', service:'partition'},
  {src:'images/glass_partition_2.jpeg', service:'partition'},
  {src:'images/glass_work_1.jpeg', service:'glass_work'},
  {src:'images/mirror_1.jpeg', service:'mirror'}
];

// Videos Array
const videos = [
  {src:'videos/glass_partition_video_1.mp4', service:'partition'}
];

const photoSlider = document.getElementById('photo-slider');
const videoSlider = document.getElementById('video-slider');

// Load media function
function loadMedia(service){
    photoSlider.innerHTML = '';
    videoSlider.innerHTML = '';

    // Load Photos
    photos.filter(p=>p.service===service).forEach(p=>{
        const img=document.createElement('img');
        img.src=p.src; img.style.width='250px'; img.style.margin='10px';
        img.addEventListener('click',()=>{
            const lightbox=document.createElement('div');
            lightbox.style.position='fixed';
            lightbox.style.top='0'; lightbox.style.left='0';
            lightbox.style.width='100%'; lightbox.style.height='100%';
            lightbox.style.background='rgba(0,0,0,0.95)';
            lightbox.style.display='flex';
            lightbox.style.justifyContent='center';
            lightbox.style.alignItems='center';
            lightbox.style.cursor='pointer';
            lightbox.style.zIndex='9999';
            const imgBox=document.createElement('img');
            imgBox.src=p.src;
            imgBox.style.maxWidth='90%'; imgBox.style.maxHeight='90%';
            lightbox.appendChild(imgBox);
            document.body.appendChild(lightbox);
            lightbox.addEventListener('click',()=>lightbox.remove());
        });
        photoSlider.appendChild(img);
    });

    // Load Videos
    videos.filter(v=>v.service===service).forEach(v=>{
        const vid=document.createElement('video');
        vid.src=v.src; vid.controls=true;
        vid.style.width='300px'; vid.style.margin='10px';
        videoSlider.appendChild(vid);
    });
}

// Service click events
document.querySelectorAll('.service-box').forEach(box=>{
    box.addEventListener('click',()=>{ loadMedia(box.dataset.service); });
});

// Load first service by default
if(document.querySelector('.service-box')){
    loadMedia(document.querySelector('.service-box').dataset.service);
}
