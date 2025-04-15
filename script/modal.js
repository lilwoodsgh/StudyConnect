// Function to open the modal and display content
export function openModal(content) {
    const modal = document.getElementById("resourceModal");
    const modalContent = document.getElementById("modalContent");
  
    modalContent.innerHTML = content;
    modal.style.display = "block";
  }
  
  // Function to close the modal
  export function closeModal() {
    const modal = document.getElementById("resourceModal");
    modal.style.display = "none";
  }
  
  // Close modal when clicking outside of it
  export function setupModalListeners() {
    const modal = document.getElementById("resourceModal");
    const closeBtn = document.querySelector(".close-btn");
  
    closeBtn.addEventListener("click", closeModal);
  
    window.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
  }
  