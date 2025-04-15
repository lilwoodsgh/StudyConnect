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
