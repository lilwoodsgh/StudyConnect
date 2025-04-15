// Renders an array of resources into the resource grid
export function renderResources(resources) {
    const grid = document.getElementById("resourceGrid");
    grid.innerHTML = "";
  
    resources.forEach(resource => {
      const card = document.createElement("div");
      card.className = "resource-card";
      card.innerHTML = `
        <h3>${resource.title}</h3>
        <p>${resource.description}</p>
        <button>View Details</button>
      `;
      grid.appendChild(card);
    });
  }
  