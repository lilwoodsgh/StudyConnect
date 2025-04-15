// Add a new study session to localStorage
export function addSession(session) {
    const sessions = getSessions();
    sessions.push(session);
    localStorage.setItem("studyConnectSessions", JSON.stringify(sessions));
  }
  
  // Retrieve all study sessions from localStorage
  export function getSessions() {
    return JSON.parse(localStorage.getItem("studyConnectSessions")) || [];
  }
  
  // Remove a study session by its index
  export function deleteSession(index) {
    const sessions = getSessions();
    sessions.splice(index, 1);
    localStorage.setItem("studyConnectSessions", JSON.stringify(sessions));
  }
  
  // Render study sessions to a target container
  export function renderSessions(containerId) {
    const container = document.getElementById(containerId);
    const sessions = getSessions();
    container.innerHTML = "";
  
    if (sessions.length === 0) {
      container.innerHTML = "<p>No study sessions scheduled yet.</p>";
      return;
    }
  
    sessions.forEach((session, index) => {
      const div = document.createElement("div");
      div.className = "session-card";
      div.innerHTML = `
        <h3>📅 ${session.title}</h3>
        <p><strong>Date:</strong> ${session.date}</p>
        <p><strong>Notes:</strong> ${session.notes}</p>
        <button class="delete-btn" data-index="${index}">🗑️ Delete</button>
      `;
      container.appendChild(div);
    });
  
    // Attach delete button events
    const deleteBtns = container.querySelectorAll(".delete-btn");
    deleteBtns.forEach(btn => {
      btn.addEventListener("click", (e) => {
        const index = e.target.dataset.index;
        deleteSession(index);
        renderSessions(containerId);
      });
    });
  }
  