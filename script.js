// Central invite (change once here)
const DISCORD_INVITE = "https://discord.com/invite/yourInviteCode";

function applyThemeToComponents() {
  const body = document.body;
  const isDark = body.getAttribute("data-theme") === "dark";
  const navbar = document.querySelector(".navbar");
  // Ensure proper icon contrast for navbar toggler/hamburger
  navbar.classList.toggle("navbar-dark", isDark);
  navbar.classList.toggle("navbar-light", !isDark);
}

// Theme Toggle
function toggleTheme() {
  const body = document.body;
  const themeIcon = document.getElementById("theme-icon");
  const currentTheme = body.getAttribute("data-theme");

  if (currentTheme === "dark") {
    body.setAttribute("data-theme", "light");
    themeIcon.className = "fas fa-sun";
  } else {
    body.setAttribute("data-theme", "dark");
    themeIcon.className = "fas fa-moon";
  }
  applyThemeToComponents();
}

// Chat scroll buttons
function scrollChat(direction) {
  const container = document.querySelector('.chat-scroll-wrapper');
  container.scrollBy({ top: direction * 100, behavior: 'smooth' });
}

// Smooth scrolling for in-page anchors only
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// Intersection Observer for fade-ins
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  },
  { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
);
document
  .querySelectorAll(".fade-in")
  .forEach((el) => observer.observe(el));

// Chat animation stagger
// function animateChat() {
//   const messages = document.querySelectorAll(".chat-message");
//   messages.forEach((message, index) => {
//     message.style.animationDelay = `${index * 0.35}s`;
//   });
// }

// Navbar background on scroll (theme-safe)
function handleScroll() {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) navbar.classList.add("scrolled");
  else navbar.classList.remove("scrolled");
}

document.addEventListener("DOMContentLoaded", () => {
  // Init theme state
  applyThemeToComponents();
  animateChat();
  handleScroll();

  // Pricing hover micro-interactions
  document.querySelectorAll(".pricing-card").forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = card.classList.contains("popular")
        ? "translateY(-10px) scale(1.07)"
        : "translateY(-10px) scale(1.02)";
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = card.classList.contains("popular")
        ? "scale(1.05)"
        : "translateY(0) scale(1)";
    });
  });

  // Scroll listener
  window.addEventListener("scroll", handleScroll);

  // Typing indicator (plays and clears)
  const chatDemo = document.querySelector(".chat-demo");
  setInterval(() => {
    const typingIndicator = document.createElement("div");
    typingIndicator.className = "chat-message";
    typingIndicator.innerHTML = `
    <div class="avatar" style="background: var(--discord-blurple);">D</div>
    <div class="message-content">
      <div class="username">DigitAI</div>
      <div class="typing-dots"><span>.</span><span>.</span><span>.</span></div>
    </div>`;
    chatDemo.appendChild(typingIndicator);
    setTimeout(() => typingIndicator.remove(), 1600);
  }, 9000);

  // Add particle animation CSS once
  const style = document.createElement("style");
  style.textContent = `
  .typing-dots span { animation: typing 1.2s infinite; opacity: 0.4; }
  .typing-dots span:nth-child(2) { animation-delay: 0.2s; }
  .typing-dots span:nth-child(3) { animation-delay: 0.4s; }
  @keyframes typing { 0%, 60%, 100% { opacity: 0.4; } 30% { opacity: 1; } }
  @keyframes particle-float { 0% { transform: translateY(0) scale(0); opacity: 0.3; } 50% { opacity: 0.6; transform: scale(1); } 100% { transform: translateY(-100px) scale(0); opacity: 0; } }
`;
  document.head.appendChild(style);

  // Create gentle particles periodically
  setInterval(() => {
    const particle = document.createElement("div");
    particle.style.cssText = `position:absolute;width:4px;height:4px;background:var(--discord-blurple);border-radius:50%;pointer-events:none;animation:particle-float 3s linear forwards;top:${
      Math.random() * 100
    }%;left:${Math.random() * 100}%;opacity:.28;`;
    document.querySelector(".hero-section").appendChild(particle);
    setTimeout(() => particle.remove(), 3000);
  }, 2200);
});
