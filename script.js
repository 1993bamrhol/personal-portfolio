const GITHUB_USER = "1993bamrhol";

document.getElementById("year").textContent = new Date().getFullYear();

const menuButton = document.querySelector(".menu-button");
const nav = document.getElementById("site-nav");
const closeMenu = () => {
  nav.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Open navigation");
};

menuButton.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
});
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu));
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && nav.classList.contains("open")) {
    closeMenu();
    menuButton.focus();
  }
});
document.addEventListener("click", event => {
  if (nav.classList.contains("open") && !event.target.closest(".site-header")) closeMenu();
});

const revealElements = [...document.querySelectorAll(".reveal")];
const deepLinkedSection = window.location.hash ? document.querySelector(window.location.hash) : null;
if (deepLinkedSection) {
  deepLinkedSection.classList.add("visible");
  deepLinkedSection.querySelectorAll(".reveal").forEach(element => element.classList.add("visible"));
}

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealElements.filter(element => !element.classList.contains("visible")).forEach(element => observer.observe(element));

async function refreshGitHubMetadata() {
  const status = document.getElementById("github-status");
  try {
    const response = await fetch(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated`, {
      headers: { Accept: "application/vnd.github+json" }
    });
    if (!response.ok) throw new Error(`GitHub returned ${response.status}`);
    const repos = await response.json();
    document.getElementById("repo-count").textContent = repos.filter(repo => !repo.fork).length;
    status.textContent = `Live GitHub metadata · updated ${new Intl.DateTimeFormat("en", { month: "short", year: "numeric" }).format(new Date())}`;
  } catch (error) {
    status.textContent = "Showing the latest saved project information.";
  }
}

refreshGitHubMetadata();
