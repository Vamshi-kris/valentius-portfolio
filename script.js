const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const themeToggle = document.querySelector(".theme-toggle");
const themeIcon = document.querySelector(".theme-icon");
const root = document.documentElement;

// Mobile navigation
if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation menu");
    });
  });
}

// Theme toggle with saved preference where localStorage is available.
function applyTheme(theme) {
  root.dataset.theme = theme;
  if (themeIcon) themeIcon.textContent = theme === "light" ? "☼" : "◐";
  if (themeToggle) {
    themeToggle.setAttribute("aria-label", theme === "light" ? "Switch to dark theme" : "Switch to light theme");
    themeToggle.setAttribute("title", theme === "light" ? "Switch to dark theme" : "Switch to light theme");
  }
}

let savedTheme = "dark";
try {
  savedTheme = localStorage.getItem("portfolio-theme") || "dark";
} catch (error) {
  // The site still works if browser storage is unavailable.
}
applyTheme(savedTheme);

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
    applyTheme(nextTheme);
    try {
      localStorage.setItem("portfolio-theme", nextTheme);
    } catch (error) {
      // Theme remains changed for this page view.
    }
  });
}

// Scroll reveal, with a fallback for browsers without IntersectionObserver.
const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

// Current year in the footer.
const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();
