// Typewriter
const text = "You are my favourite person 💙";
let index = 0;
const speed = 70;

function typeWriter() {
    if (index < text.length) {
        document.getElementById("typewriter").innerHTML += text.charAt(index);
        index++;
        setTimeout(typeWriter, speed);
    }
}
typeWriter();

// Lightbox
function openLightbox(src) {
    document.getElementById("lightbox").style.display = "flex";
    document.getElementById("lightbox-img").src = src;
}

function closeLightbox() {
    document.getElementById("lightbox").style.display = "none";
}

// Unlock Secret
document.getElementById("bell").addEventListener("click", function() {
    document.getElementById("secret").style.display = "block";
});

// Enable music on first tap (mobile autoplay fix)
document.body.addEventListener("click", function() {
    const music = document.getElementById("bg-music");
    music.muted = false;
    music.play();
}, { once: true });

// Simple particles
const canvas = document.createElement("canvas");
document.getElementById("particles").appendChild(canvas);
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
for(let i=0;i<50;i++){
    particles.push({
        x: Math.random()*canvas.width,
        y: Math.random()*canvas.height,
        r: Math.random()*2,
        d: Math.random()*1
    });
}

function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = "rgba(0,150,255,0.5)";
    particles.forEach(p=>{
        ctx.beginPath();
        ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fill();
    });
    update();
}

function update(){
    particles.forEach(p=>{
        p.y += p.d;
        if(p.y>canvas.height){p.y=0;}
    });
}

setInterval(draw,33);
