import { setupModalListeners, openModal } from './modal.js';
import { addSession, renderSessions } from './sessionmanager.js';
import { renderResources, searchResources } from './dom.js';
import { fetchWordAsResource } from './api.js';
import { addFavorite, renderFavorites } from './favorites.js';

// Select DOM elements
const menuToggle = document.getElementById('menu-toggle');
const mainNav = document.getElementById('main-nav');
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const fetchButton = document.getElementById('fetch-button');
const wordInput = document.getElementById('word-input');
const definitionDisplay = document.getElementById('definition-display');
const sessionsContainerId = 'sessionsContainer';

// Initialize modal listeners
setupModalListeners();

// Toggle mobile navigation
menuToggle.addEventListener('click', () => {
  mainNav.classList.toggle('show');
});

// Dark mode toggle
themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  const isDark = body.classList.contains('dark-mode');
  localStorage.setItem('studyConnectDarkMode', isDark ? 'enabled' : 'disabled');
  updateThemeIcon(isDark);
});

// Load saved dark mode preference on page load
document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('studyConnectDarkMode') === 'enabled') {
    body.classList.add('dark-mode');
    updateThemeIcon(true);
  }

  // Initialize resources and favorites
  let resourceList = [
    { title: "Article: Study Smarter", description: "Time management and productivity techniques." },
    { title: "Video: Focus Tips", description: "Strategies to stay focused during study sessions." }
  ];

  renderResources(resourceList);
  renderFavorites("favoritesContainer");

  // Handle search button click
  document.getElementById("searchBtn").addEventListener("click", async () => {
    const query = document.getElementById("searchInput").value.trim();
    if (!query) return;

    const newResource = await fetchWordAsResource(query);
    if (newResource) {
      resourceList.unshift(newResource);
      renderResources(resourceList);
    }
  });

  // Handle clicking a resource button to add to favorites
  document.getElementById("resourceGrid").addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const card = e.target.closest(".resource-card");
      const title = card.querySelector("h3").textContent;
      const description = card.querySelector("p").textContent;

      const resource = { title, description };
      addFavorite(resource);
      renderFavorites("favoritesContainer");
    }
  });

  // Render existing study sessions
  renderSessions("sessionsContainer");

  // Handle adding a new study session
  document.getElementById("sessionForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.getElementById("sessionTitle").value.trim();
    const date = document.getElementById("sessionDate").value;
    const notes = document.getElementById("sessionNotes").value.trim();

    if (title && date) {
      const newSession = { title, date, notes };
      addSession(newSession);
      renderSessions("sessionsContainer");
      e.target.reset();
    } else {
      openModal('<p>Please provide both a title and a date for the session.</p>');
    }
  });

  // Example test: open modal with the 'M' key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'm') {
      openModal("<h2>Modal Test</h2><p>This is a test modal opened with the 'M' key.</p>");
    }
  });
});

// Function to update theme icon
function updateThemeIcon(isDark) {
  themeToggle.textContent = isDark ? '☀️' : '🌙';
}

// ✅ REPLACEMENT: Fetch and display definition using fetchWordAsResource
fetchButton.addEventListener('click', async () => {
  const word = wordInput.value.trim();
  if (!word) {
    definitionDisplay.textContent = 'Please enter a word.';
    return;
  }

  try {
    const result = await fetchWordAsResource(word);
    if (result) {
      definitionDisplay.textContent = `${result.description}`;
      openModal(`<h3>${result.title}</h3><p>${result.description}</p>`);
    } else {
      definitionDisplay.textContent = `No definition found for "${word}".`;
      openModal(`No definition found for "${word}".`);
    }
  } catch (error) {
    console.error("Fetch error:", error);
    definitionDisplay.textContent = 'An error occurred while fetching the definition.';
    openModal('An error occurred while fetching the definition.');
  }
});
