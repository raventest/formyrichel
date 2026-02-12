// =============================
// TYPEWRITER
// =============================
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


// =============================
// LIGHTBOX
// =============================
function openLightbox(src) {
    document.getElementById("lightbox").style.display = "flex";
    document.getElementById("lightbox-img").src = src;
}

function closeLightbox() {
    document.getElementById("lightbox").style.display = "none";
}


// =============================
// BELL TOGGLE + MUSIC (MOBILE SAFE)
// =============================
const bell = document.getElementById("bell");
const secret = document.getElementById("secret");
const music = document.getElementById("bg-music");

let isUnlocked = false;

function toggleSecret(e) {
    e.preventDefault(); // prevents double trigger on mobile

    if (!isUnlocked) {
        // SHOW SECRET
        secret.style.display = "block";

        // Play music (allowed because triggered by tap)
        music.play().catch(err => {
            console.log("Playback blocked:", err);
        });

        // Stop shaking + glow
        bell.style.animation = "none";
        bell.style.filter = "drop-shadow(0 0 15px rgba(0,150,255,0.9))";

        isUnlocked = true;

    } else {
        // HIDE SECRET
        secret.style.display = "none";

        // Stop and reset music
        music.pause();
        music.currentTime = 0;

        // Resume shaking
        bell.style.animation = "bellShake 0.8s infinite ease-in-out";
        bell.style.filter = "none";

        isUnlocked = false;
    }
}

// Support mobile + desktop safely
bell.addEventListener("click", toggleSecret);
bell.addEventListener("touchstart", toggleSecret);


// =============================
// PARTICLES BACKGROUND
// =============================
const canvas = document.createElement("canvas");
document.getElementById("particles").appendChild(canvas);
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let particles = [];

for (let i = 0; i < 50; i++) {
    particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2,
        d: Math.random() * 1 + 0.3
    });
}

function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(0,150,255,0.5)";

    particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
    });

    updateParticles();
}

function updateParticles() {
    particles.forEach(p => {
        p.y += p.d;
        if (p.y > canvas.height) {
            p.y = 0;
            p.x = Math.random() * canvas.width;
        }
    });
}

setInterval(drawParticles, 33);
