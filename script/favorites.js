// Add a resource to favorites in localStorage
export function addFavorite(resource) {
    const favorites = getFavorites();
    favorites.push(resource);
    localStorage.setItem("studyConnectFavorites", JSON.stringify(favorites));
  }
  
  // Retrieve all favorites from localStorage
  export function getFavorites() {
    return JSON.parse(localStorage.getItem("studyConnectFavorites")) || [];
  }
  
  // Remove a favorite by its index
  export function removeFavorite(index) {
    const favorites = getFavorites();
    favorites.splice(index, 1);
    localStorage.setItem("studyConnectFavorites", JSON.stringify(favorites));
  }
  
  // Render favorites list to a target container
  export function renderFavorites(containerId) {
    const container = document.getElementById(containerId);
    const favorites = getFavorites();
    container.innerHTML = "";
  
    if (favorites.length === 0) {
      container.innerHTML = "<p>No favorites saved yet.</p>";
      return;
    }
  
    favorites.forEach((fav, index) => {
      const card = document.createElement("div");
      card.className = "resource-card";
      card.innerHTML = `
        <h3>${fav.title}</h3>
        <p>${fav.description}</p>
        <button class="remove-fav-btn" data-index="${index}">🗑️ Remove</button>
      `;
      container.appendChild(card);
    });
  
    // Attach delete button handlers
    const removeBtns = container.querySelectorAll(".remove-fav-btn");
    removeBtns.forEach(btn => {
      btn.addEventListener("click", (e) => {
        const index = e.target.dataset.index;
        removeFavorite(index);
        renderFavorites(containerId);
      });
    });
  }

document.addEventListener('DOMContentLoaded', () => {
  const favoritesGrid = document.getElementById('favoritesGrid');
  const themeToggle = document.getElementById('theme-toggle');
  const menuToggle = document.getElementById('menu-toggle');
  const mainNav = document.getElementById('main-nav');
  const body = document.body;

  // Load dark mode preference
  if (localStorage.getItem('studyConnectDarkMode') === 'enabled') {
    body.classList.add('dark-mode');
    updateThemeIcon();
  }

  // Toggle menu
  menuToggle.addEventListener('click', () => {
    mainNav.classList.toggle('show');
  });

  // Theme toggle button
  themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    localStorage.setItem('studyConnectDarkMode', body.classList.contains('dark-mode') ? 'enabled' : 'disabled');
    updateThemeIcon();
  });

  function updateThemeIcon() {
    themeToggle.textContent = body.classList.contains('dark-mode') ? '☀️' : '🌙';
  }

  // Load favorites from localStorage
  function loadFavorites() {
    const favorites = JSON.parse(localStorage.getItem('studyConnectFavorites')) || [];

    if (favorites.length === 0) {
      favoritesGrid.innerHTML = '<p>No favorite resources saved yet.</p>';
      return;
    }

    favoritesGrid.innerHTML = "";
    favorites.forEach((item, index) => {
      const card = document.createElement('div');
      card.className = 'favorite-card';
      card.innerHTML = `
        <h3>${item.title}</h3>
        <p>${item.description}</p>
        <button class="remove-btn" data-index="${index}">❌ Remove</button>
      `;
      favoritesGrid.appendChild(card);
    });
  }

  // Remove favorite
  favoritesGrid.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-btn')) {
      const index = e.target.getAttribute('data-index');
      const favorites = JSON.parse(localStorage.getItem('studyConnectFavorites')) || [];
      favorites.splice(index, 1);
      localStorage.setItem('studyConnectFavorites', JSON.stringify(favorites));
      loadFavorites();
    }
  });

  loadFavorites();
});
