// ---------- Footer year ----------
document.getElementById("year").textContent = new Date().getFullYear();

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;

// ---------- Custom cursor (desktop only) ----------
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

  const interactiveSelectors = "a, button, .cert-card, .bento-card, .exp-card, .chip-list span, .skill-category";
  document.querySelectorAll(interactiveSelectors).forEach((el) => {
    el.addEventListener("mouseenter", () => cursorRing.classList.add("cursor-active"));
    el.addEventListener("mouseleave", () => cursorRing.classList.remove("cursor-active"));
  });
}

// ---------- Sticky navbar background on scroll ----------
const navbar = document.getElementById("navbar");
function updateNavbar() {
  navbar.classList.toggle("scrolled", window.scrollY > 20);
}
window.addEventListener("scroll", updateNavbar);
updateNavbar();

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

// ---------- Reveal on scroll, staggered within each group ----------
const revealGroups = {};
document.querySelectorAll(".reveal").forEach((el) => {
  const parent = el.closest("section")?.id || "default";
  revealGroups[parent] = revealGroups[parent] || [];
  const indexInGroup = revealGroups[parent].length;
  revealGroups[parent].push(el);
  el.style.transitionDelay = prefersReducedMotion ? "0s" : `${Math.min(indexInGroup * 70, 420)}ms`;
});

if (prefersReducedMotion) {
  document.querySelectorAll(".reveal").forEach((el) => el.classList.add("in-view"));
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
    { threshold: 0.12 }
  );
  document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));
}

// ---------- Active section highlighting in nav ----------
const sections = document.querySelectorAll(".section, .hero");
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

// ---------- Magnetic buttons ----------
if (!isTouchDevice && !prefersReducedMotion) {
  document.querySelectorAll(".magnetic").forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
      const rect = btn.getBoundingClientRect();
      const relX = e.clientX - rect.left - rect.width / 2;
      const relY = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${relX * 0.18}px, ${relY * 0.3}px)`;
    });
    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "translate(0, 0)";
    });
  });
}

// ---------- Subtle hero parallax on mouse move ----------
if (!isTouchDevice && !prefersReducedMotion) {
  const glowGold = document.getElementById("glowGold");
  const glowCyan = document.getElementById("glowCyan");
  const portrait = document.getElementById("heroPortrait");
  const heroSection = document.getElementById("home");

  heroSection.addEventListener("mousemove", (e) => {
    const rect = heroSection.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;

    glowGold.style.transform = `translate(${relX * 30}px, ${relY * 30}px)`;
    glowCyan.style.transform = `translate(${relX * -24}px, ${relY * -24}px)`;
    if (portrait) {
      portrait.style.transform = `translate(${relX * 10}px, ${relY * 10}px)`;
    }
  });
}
