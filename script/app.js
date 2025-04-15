import { setupModalListeners, openModal } from './modal.js';
import { addSession, renderSessions } from './sessionmanager.js'; // Adjusted casing to match the actual file name
import { renderResources } from './dom.js'; // Added import for renderResources

// Select DOM elements
const menuToggle = document.getElementById('menu-toggle');
const mainNav = document.getElementById('main-nav');
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const fetchButton = document.getElementById('fetch-button'); // Button to fetch definition
const wordInput = document.getElementById('word-input'); // Input field for the word
const definitionDisplay = document.getElementById('definition-display'); // Element to display the definition
const sessionsContainerId = 'sessionsContainer'; // ID of the container for sessions

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
  // Load saved dark mode preference
  if (localStorage.getItem('studyConnectDarkMode') === 'enabled') {
    body.classList.add('dark-mode');
    updateThemeIcon(true);
  }

  // Example test to open modal with the 'M' key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'm') {
      openModal("<h2>Modal Test</h2><p>This is a test modal opened with the 'M' key.</p>");
    }
  });

  // Render existing study sessions
  renderSessions("sessionsContainer");

  // Render study resources with test data
  const testResources = [
    { title: "Article: Study Smarter, Not Harder", description: "Tips for effective time management and productivity techniques." },
    { title: "Definition: Metacognition", description: "The awareness and understanding of one's own thought processes." },
    { title: "Video: 10-Minute Study Break Ideas", description: "Quick activities to recharge during intense study sessions." }
  ];
  renderResources(testResources);

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
      e.target.reset(); // Clear the form
    } else {
      openModal('<p>Please provide both a title and a date for the session.</p>');
    }
  });
});

// Function to update theme icon
function updateThemeIcon(isDark) {
  themeToggle.textContent = isDark ? '☀️' : '🌙';
}

// Fetch and display the definition of a word
fetchButton.addEventListener('click', () => {
  const word = wordInput.value.trim();

  if (!word) {
    definitionDisplay.textContent = 'Please enter a word.';
    return;
  }

  fetchDefinition(word)
    .then(data => {
      if (data && data.definition) {
        definitionDisplay.textContent = `Definition of "${word}": ${data.definition}`;
        openModal(`Definition of "${word}": ${data.definition}`); // Open modal with definition
      } else {
        definitionDisplay.textContent = `No definition found for "${word}".`;
        openModal(`No definition found for "${word}".`); // Open modal with error message
      }
    })
    .catch(error => {
      console.error("Fetch error:", error);
      definitionDisplay.textContent = 'An error occurred while fetching the definition.';
      openModal('An error occurred while fetching the definition.'); // Open modal with error message
    });
});
