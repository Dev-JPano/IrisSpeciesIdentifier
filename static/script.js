// Theme Toggle
const themeBtn = document.querySelector('.theme-toggle');
themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
});
// Optional: falling Iris petals animation
const canvas = document.getElementById('flowerCanvas');
const ctx = canvas.getContext('2d');

let petals = [];
const petalCount = 30;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Petal class
class Petal {
    constructor() {
        this.reset();
    }
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height - canvas.height;
        this.size = Math.random() * 8 + 4;
        this.speed = Math.random() * 1 + 0.5;
        this.angle = Math.random() * 2 * Math.PI;
        this.color = `rgba(255,105,180, ${Math.random() * 0.7 + 0.3})`; // pink
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
    update() {
        this.y += this.speed;
        this.x += Math.sin(this.angle) * 0.5;
        this.angle += 0.01;
        if (this.y > canvas.height) this.reset();
    }
}

// Initialize petals
for (let i = 0; i < petalCount; i++) petals.push(new Petal());

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    petals.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animate);
}

// Only run animation if online
if (navigator.onLine) animate();