// Show current UTC time
function showTime() {
  const el = document.getElementById("currentTime");
  if (!el) return;
  el.textContent = new Date().toUTCString();
}

showTime();
setInterval(showTime, 1000);

// Scroll reveal for sections
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll(".fade-section").forEach((sec) => observer.observe(sec));

// Contact form success message (front‑end only)
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

if (contactForm && formStatus) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Simulate sending message
    const name = document.getElementById("name")?.value || "";
    const email = document.getElementById("email")?.value || "";

    // Simple success message for the person who sent it
    formStatus.textContent =
      "Thank you, " +
      name +
      "! Your message has been sent successfully. I will reply to " +
      email +
      " soon.";
    formStatus.style.color = "#1aaec5";

    // Clear inputs after a short delay
    setTimeout(() => {
      contactForm.reset();
    }, 400);

    // Hide success text after some time
    setTimeout(() => {
      formStatus.textContent = "";
    }, 6000);
  });
}

// Set footer year
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

document.addEventListener("DOMContentLoaded", () => {

    /* ==============================
       1. TYPEWRITER EFFECT
    ============================== */
    const phrases = [
        "Full Stack Developer",
        "Problem Solver",
        "Python Enthusiast",
        "Web Developer"
    ];

    const typewriterEl = document.getElementById("typewriter");

    if (typewriterEl) {
        let sleepTime = 100;
        let phraseIndex = 0;

        const typeLoop = async () => {
            while (true) {
                const word = phrases[phraseIndex];

                // Typing
                for (let i = 0; i <= word.length; i++) {
                    typewriterEl.textContent = word.substring(0, i);
                    await new Promise(res => setTimeout(res, sleepTime));
                }

                await new Promise(res => setTimeout(res, 2000));

                // Deleting
                for (let i = word.length; i >= 0; i--) {
                    typewriterEl.textContent = word.substring(0, i);
                    await new Promise(res => setTimeout(res, sleepTime / 2));
                }

                phraseIndex = (phraseIndex + 1) % phrases.length;
                await new Promise(res => setTimeout(res, 500));
            }
        };

        typeLoop();
    }

    /* ==============================
       2. CANVAS NETWORK BACKGROUND
    ============================== */
    const canvas = document.getElementById("network-canvas");

    if (canvas) {
        const ctx = canvas.getContext("2d");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let particles = [];

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 1;
                this.speedX = Math.random() * 1.5 - 0.75;
                this.speedY = Math.random() * 1.5 - 0.75;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
                if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
            }

            draw() {
                ctx.fillStyle = "#fefefa";
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function initParticles() {
            particles = [];
            const count = (canvas.width * canvas.height) / 9000;
            for (let i = 0; i < count; i++) {
                particles.push(new Particle());
            }
        }

        function connectParticles() {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 100) {
                        ctx.strokeStyle = `rgba(139,92,246,${1 - dist / 100})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
        }

        function animateCanvas() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            connectParticles();
            requestAnimationFrame(animateCanvas);
        }

        window.addEventListener("resize", () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        });

        initParticles();
        animateCanvas();
    }

    /* ==============================
       3. CUSTOM CURSOR
    ============================== */
    const cursorDot = document.getElementById("cursor-dot");
    const cursorRing = document.getElementById("cursor-ring");

    if (cursorDot && cursorRing) {
        window.addEventListener("mousemove", e => {
            cursorDot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;

            setTimeout(() => {
                cursorRing.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
            }, 60);
        });
    }

    /* ==============================
       4. SCROLL REVEAL ANIMATION
    ============================== */
    const revealElements = document.querySelectorAll(".hidden-reveal");

    if (revealElements.length > 0) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show-reveal");
                }
            });
        }, { threshold: 0.15 });

        revealElements.forEach(el => observer.observe(el));
    }

});

/* BUTTON FUNCTION*/
function toggleActive(button) {
        button.classList.toggle("active");
    }