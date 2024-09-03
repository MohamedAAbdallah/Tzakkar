function get_message_data() {
    return "Astaghfirullah."; // Placeholder for dynamic message content
  }
  
  function createPopup() {
    // Remove existing popup if any
    const existingPopup = document.getElementById("Zekr");
    if (existingPopup) {
      existingPopup.remove();
    }
  
    const popup = document.createElement("div");
    popup.id = "Zekr";
    popup.className = "Zekr_Pink"; // Corrected to className
  
    // Applying styles for modern look and scalability
    popup.style = `
      position: fixed;
      bottom: 2%;
      right: 2%;
      padding: 1.5rem 2rem; 
  
      color: #FFFFFF;
      background-color: #E897B4; /* Pink, can be made dynamic later */
      
      border-radius: 0.5rem;
      box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
  
      font-family: Arial, sans-serif;
      font-size: 1rem;
      max-width: 90%;
      width: 20rem;
      display: flex;
      flex-direction: column;
      align-items: start;
  
      z-index: 2147483647;
      cursor: pointer;
    `;
  
    // Add content
    const title = "Zekr";
    const message = get_message_data();
  
    popup.innerHTML = `
      <strong id="Zekr_Title" style="font-size: 1.2rem; margin-bottom: 0.5rem; color: #4B2A43;">${title}</strong>
      <span id="Zekr_Message" style="font-size: 1rem; line-height: 1.5; color: #FFFFFF;">${message}</span>
    `;
  
    popup.onclick = () => popup.remove();
  
    document.body.appendChild(popup);
  
    // Remove the popup after 5 seconds if not clicked
    setTimeout(() => {
      if (popup.parentNode) {
        popup.remove();
      }
    }, 5000);
  }
  
  function regeneratePopup() {
    createPopup(); // Create the popup
  
    // Set a fixed interval of 15 seconds for the next popup creation
    setTimeout(regeneratePopup, 15000);
  }
  
  // Start the process
  regeneratePopup();
  