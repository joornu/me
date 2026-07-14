const bootScreen = document.getElementById("boot-screen");
const enterSite = document.getElementById("enter-site");

enterSite.addEventListener("click", () => {
  bootScreen.classList.add("hidden");
  sessionStorage.setItem("synapseBooted", "true");
});

if (sessionStorage.getItem("synapseBooted") === "true") {
  bootScreen.classList.add("hidden");
}

const revealItems = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
revealItems.forEach(item => revealObserver.observe(item));

const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");
menuToggle.addEventListener("click", () => {
  const open = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});
mainNav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

const synButton = document.getElementById("syn-button");
const synPanel = document.getElementById("syn-panel");
const synClose = document.getElementById("syn-close");

function setSyn(open) {
  synPanel.classList.toggle("open", open);
  synPanel.setAttribute("aria-hidden", String(!open));
}
synButton.addEventListener("click", () => setSyn(!synPanel.classList.contains("open")));
synClose.addEventListener("click", () => setSyn(false));

const quotes = [
  "La mejor forma de aprender algo es enseñarlo.",
  "La curiosidad fue el inicio de este viaje.",
  "Investigar es una forma de seguir haciendo preguntas.",
  "La tecnología tiene más valor cuando ayuda a las personas a aprender.",
  "Cada nueva herramienta es también una nueva pregunta."
];
document.getElementById("daily-quote").textContent =
  `“${quotes[new Date().getDate() % quotes.length]}”`;

// Fondo de estrellas
const canvas = document.getElementById("starfield");
const ctx = canvas.getContext("2d");
let stars = [];

function resizeCanvas() {
  canvas.width = window.innerWidth * devicePixelRatio;
  canvas.height = window.innerHeight * devicePixelRatio;
  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;
  ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);

  const count = Math.min(150, Math.floor(window.innerWidth / 8));
  stars = Array.from({ length: count }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    r: Math.random() * 1.4 + 0.2,
    a: Math.random() * 0.65 + 0.15,
    s: Math.random() * 0.14 + 0.03
  }));
}

function drawStars() {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  stars.forEach(star => {
    star.y += star.s;
    if (star.y > window.innerHeight) star.y = 0;
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(190,225,255,${star.a})`;
    ctx.fill();
  });
  requestAnimationFrame(drawStars);
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();
drawStars();

// Easter egg: Código Konami
const konami = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "b", "a"
];
let konamiIndex = 0;

window.addEventListener("keydown", event => {
  const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
  if (key === konami[konamiIndex]) {
    konamiIndex++;
    if (konamiIndex === konami.length) {
      document.body.classList.toggle("cyber-night");
      document.getElementById("daily-quote").textContent =
        "“CURIOSITY MODE UNLOCKED.”";
      konamiIndex = 0;
    }
  } else {
    konamiIndex = 0;
  }
});
