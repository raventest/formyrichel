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

// Hero subtle parallax
window.addEventListener("scroll", () => {
    const heroImg = document.querySelector(".hero-img");
    let offset = window.scrollY * 0.3;
    heroImg.style.transform = `translateY(${offset}px)`;
});



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

bell.addEventListener("click", function () {

    if (!isUnlocked) {

        secret.style.display = "block";

        // Mobile-safe play
        music.volume = 0;
        const playPromise = music.play();

        if (playPromise !== undefined) {
            playPromise.then(() => {
                // Smooth fade in
                let fade = setInterval(() => {
                    if (music.volume < 0.9) {
                        music.volume += 0.05;
                    } else {
                        clearInterval(fade);
                    }
                }, 120);
            }).catch(() => {
                console.log("User interaction required");
            });
        }

        bell.style.animation = "none";
        bell.style.filter = "drop-shadow(0 0 18px rgba(0,200,255,0.9))";

        isUnlocked = true;

    } else {

        // Fade out smoothly
        let fade = setInterval(() => {
            if (music.volume > 0.05) {
                music.volume -= 0.05;
            } else {
                clearInterval(fade);
                music.pause();
                music.currentTime = 0;
            }
        }, 120);

        secret.style.display = "none";
        bell.style.animation = "bellShake 0.8s infinite ease-in-out";
        bell.style.filter = "none";

        isUnlocked = false;
    }
});


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

// Scroll reveal with depth
const memories = document.querySelectorAll(".memory");

function revealMemories() {
    memories.forEach((memory, index) => {
        const rect = memory.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            setTimeout(() => {
                memory.classList.add("show");
            }, index * 150);
        }
    });
}


window.addEventListener("scroll", revealMemories);
revealMemories();

memories.forEach(card => {

    card.addEventListener("mousemove", (e) => {

        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = -(y - centerY) / 15;
        const rotateY = (x - centerX) / 15;

        card.style.transform = `
            perspective(800px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            scale(1.03)
        `;
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = "perspective(800px) rotateX(0) rotateY(0) scale(1)";
    });

});


