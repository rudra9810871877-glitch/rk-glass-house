
// Photos Array
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

// Videos Array
const videos = [
  {src:'videos/window_glass.mp4', service:'window_glass'},
  {src:'videos/mirror.mp4', service:'mirror'},
  {src:'videos/glass_partition.mp4', service:'glass_partition'}
];

const photoSlider = document.getElementById('photo-slider');
const videoSlider = document.getElementById('video-slider');

// Load media function
function loadMedia(service){
    photoSlider.innerHTML = '';
    videoSlider.innerHTML = '';
    photos.filter(p=>p.service===service).forEach(p=>{
        const img=document.createElement('img');
        img.src=p.src; img.style.width='250px'; img.style.margin='10px';
        img.addEventListener('click',()=>{
            const lightbox=document.createElement('div');
            lightbox.style.position='fixed'; lightbox.style.top='0'; lightbox.style.left='0';
            lightbox.style.width='100%'; lightbox.style.height='100%';
            lightbox.style.background='rgba(0,0,0,0.95)';
            lightbox.style.display='flex'; lightbox.style.justifyContent='center';
            lightbox.style.alignItems='center'; lightbox.style.cursor='pointer'; lightbox.style.zIndex='9999';
            const imgBox=document.createElement('img');
            imgBox.src=p.src; imgBox.style.maxWidth='90%'; imgBox.style.maxHeight='90%';
            lightbox.appendChild(imgBox); document.body.appendChild(lightbox);
            lightbox.addEventListener('click',()=>lightbox.remove());
        });
        photoSlider.appendChild(img);
    });

    videos.filter(v=>v.service===service).forEach(v=>{
        const vid=document.createElement('video');
        vid.src=v.src; vid.controls=true; vid.style.width='300px'; vid.style.margin='10px';
        videoSlider.appendChild(vid);
    });
}

// Service click
document.querySelectorAll('.service-box').forEach(box=>{
    box.addEventListener('click',()=>{ loadMedia(box.dataset.service); });
});

// Load first service by default
if(document.querySelector('.service-box')){
    loadMedia(document.querySelector('.service-box').dataset.service);
}
