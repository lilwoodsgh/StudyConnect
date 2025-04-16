import { fetchWordAsResource } from './api.js';
import { addFavorite } from './favorites.js';
import { openModal, setupModalListeners } from './modal.js';

// Dark mode + menu toggle setup
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  localStorage.setItem('studyConnectDarkMode', body.classList.contains('dark-mode') ? 'enabled' : 'disabled');
  updateThemeIcon();
});

function updateThemeIcon() {
  themeToggle.textContent = body.classList.contains('dark-mode') ? '☀️' : '🌙';
}

console.log("resource.js loaded");

document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menu-toggle');
  const mainNav = document.getElementById('main-nav');

  // Hamburger menu toggle logic
  menuToggle.addEventListener('click', () => {
    mainNav.classList.toggle('show');
  });

  if (localStorage.getItem('studyConnectDarkMode') === 'enabled') {
    body.classList.add('dark-mode');
    updateThemeIcon();
  }

  setupModalListeners();
  loadDefaultResources();
});

// Load default resources
function loadDefaultResources() {
  console.log("Loading default resources...");
  const defaultResources = [
    { title: "Article: Study Smarter", description: "Learn proven time management and productivity strategies." },
    { title: "Video: Focus Tips", description: "Watch how to stay focused during study sessions and exams." },
    { title: "Infographic: Active Recall", description: "Visual guide to effective memory techniques." },
    { title: "Article: Study Hacks", description: "Quick tips and unconventional study hacks that work." }
  ];
  renderResources(defaultResources);
}

// Search handler
document.getElementById('searchBtn').addEventListener('click', async () => {
  const query = document.getElementById('searchInput').value.trim();
  if (!query) return;

  const newResource = await fetchWordAsResource(query);
  if (newResource) {
    renderResources([newResource]);
  } else {
    alert("No definition found.");
  }
});

// Render resource cards
function renderResources(resources) {
  const grid = document.getElementById("resourceGrid");
  console.log("Resource grid found:", grid); // Should log the div element
  grid.innerHTML = "";

  resources.forEach(resource => {
    const card = document.createElement("div");
    card.className = "resource-card";
    card.innerHTML = `
      <h3>${resource.title}</h3>
      <p>${resource.description}</p>
      <button class="details-btn">📖 Details</button>
      <button class="fav-btn">⭐ Favorite</button>
    `;
    grid.appendChild(card);
  });
}
