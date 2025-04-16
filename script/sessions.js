document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('startTimerBtn');
    const endBtn = document.getElementById('endTimerBtn');
    const timerDisplay = document.getElementById('timerDisplay');
    const sessionForm = document.getElementById('sessionForm');
    const sessionHistoryTable = document.getElementById('sessionHistoryTable').getElementsByTagName('tbody')[0];
  
    let timerInterval;
    let timerSeconds = 0;
  
    // Start Timer Logic
    startBtn.addEventListener('click', () => {
      startBtn.disabled = true;
      endBtn.disabled = false;
  
      timerInterval = setInterval(() => {
        timerSeconds++;
        timerDisplay.textContent = formatTime(timerSeconds);
      }, 1000);
    });
  
    // End Timer Logic
    endBtn.addEventListener('click', () => {
      clearInterval(timerInterval);
      startBtn.disabled = false;
      endBtn.disabled = true;
  
      // Save Session Data
      saveSessionData(timerSeconds);
    });
  
    // Handle Form Submission
    sessionForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const subject = document.getElementById('subject').value;
      const focus = document.getElementById('focus').value;
      const duration = document.getElementById('duration').value;
  
      const session = { subject, focus, duration, date: new Date().toLocaleString() };
      addSessionToHistory(session);
    });
  
    // Add session to history table
    function addSessionToHistory(session) {
      const row = sessionHistoryTable.insertRow();
      row.innerHTML = `
        <td>${session.subject}</td>
        <td>${session.focus}</td>
        <td>${session.duration} mins</td>
        <td>${session.date}</td>
      `;
    }
  
    // Save session data (e.g., in localStorage)
    function saveSessionData(timeInSeconds) {
      const sessionData = {
        subject: "General Study",
        focus: "Review notes",
        duration: timeInSeconds / 60, // Convert to minutes
        date: new Date().toLocaleString(),
      };
      addSessionToHistory(sessionData);
    }
  
    // Format time as MM:SS
    function formatTime(seconds) {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    }
  });
  