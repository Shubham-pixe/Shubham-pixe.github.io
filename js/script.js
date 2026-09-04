// ---------- Footer year ----------
document.getElementById("year").textContent = new Date().getFullYear();

// ---------- Detect touch devices: disable custom cursor ----------
const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;

if (isTouchDevice) {
  document.body.classList.add("no-custom-cursor");
} else {
  const cursorDot = document.getElementById("cursorDot");
  const cursorRing = document.getElementById("cursorRing");

  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
  });

  function animateRing() {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    cursorRing.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
    requestAnimationFrame(animateRing);
  }
  animateRing();

  const interactiveSelectors = "a, button, .cert-card, .tag-list span, .timeline-card";
  document.querySelectorAll(interactiveSelectors).forEach((el) => {
    el.addEventListener("mouseenter", () => cursorRing.classList.add("cursor-active"));
    el.addEventListener("mouseleave", () => cursorRing.classList.remove("cursor-active"));
  });
}

// ---------- Mobile nav toggle ----------
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

navToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", isOpen);
});

document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

// ---------- Scroll progress bar ----------
const scrollProgress = document.getElementById("scrollProgress");

window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  scrollProgress.style.width = pct + "%";
});

// ---------- Reveal on scroll ----------
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const revealEls = document.querySelectorAll(".reveal");

if (prefersReducedMotion) {
  revealEls.forEach((el) => el.classList.add("in-view"));
} else {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  revealEls.forEach((el) => revealObserver.observe(el));
}

// ---------- Active section highlighting in nav ----------
const sections = document.querySelectorAll(".section");
const navAnchors = document.querySelectorAll(".nav-link");

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navAnchors.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
        });
      }
    });
  },
  { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
);

sections.forEach((section) => navObserver.observe(section));

// ---------- Subtle animated dot-grid background ----------
const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");
let width, height, dots;

function resizeCanvas() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
  const spacing = 46;
  dots = [];
  for (let x = spacing / 2; x < width; x += spacing) {
    for (let y = spacing / 2; y < height; y += spacing) {
      dots.push({ x, y, baseY: y, offset: Math.random() * Math.PI * 2 });
    }
  }
}

function drawFrame(time) {
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "rgba(232, 163, 61, 0.35)";
  const t = time * 0.001;

  dots.forEach((d) => {
    const wobble = prefersReducedMotion ? 0 : Math.sin(t * 0.6 + d.offset) * 3;
    ctx.beginPath();
    ctx.arc(d.x, d.baseY + wobble, 1.1, 0, Math.PI * 2);
    ctx.fill();
  });

  if (!prefersReducedMotion) {
    requestAnimationFrame(drawFrame);
  }
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);
requestAnimationFrame(drawFrame);
if (prefersReducedMotion) {
  // Draw a single static frame instead of animating continuously.
  drawFrame(0);
}
