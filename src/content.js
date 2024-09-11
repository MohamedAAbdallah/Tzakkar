function get_message_data() {
  var messages = [
    "الْلَّهُم صَلِّ وَسَلِم وَبَارِك عَلَى سَيِّدِنَا مُحَمَّد",
    "استغفر الله واتوب اليه",
    "سبحان الله وبحمده",
    "لا اله الا الله",
    "الحمد لله",
    "الله اكبر",
    "سبحان الله",
    "اللهم اني اسالك العفو والعافية",
    "اللهم اني اسالك العلم النافع",
    "اللهم اني اسالك الهدى والتقى والعفاف والغنى",
    "اللهم اني اسالك الجنة واعوذ بك من النار",
    "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ ، سُبْحَانَ اللَّهِ الْعَظِيمِ",
    "الْحَمْدُ لِلَّهِ حَمْدًا كَثِيرًا طَيِّبًا مُبَارَكًا فِيهِ",
  ];
  return messages[Math.floor(Math.random() * messages.length)];
}

function createPopup() {
  const existingPopup = document.getElementById("Zekr");
  if (existingPopup) {
    existingPopup.remove();
  }

  const popup = document.createElement("div");
  popup.id = "Zekr";
  popup.className = "Zekr_Pink";

  // Apply CSS styles directly
  popup.style = `
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    bottom: 2%;
    right: 1%;
    padding: 0.5rem 1rem;
    font-family: "Lalezar", system-ui !important;
    font-weight: 600 !important;
    color: #FFFFFF;
    background-color: #E897B4;
    border-radius: 1.5rem;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.3);
    font-size: 1.3rem !important;
    max-width: 90%;
    flex-direction: column;
    align-items: start;
    z-index: 2147483647;
    cursor: pointer;
    transform: translateY(100%); /* Start off-screen */
    animation: slide-up 0.5s ease-out forwards; /* Animation properties */
  `;

  const title = "Zekr";
  const message = get_message_data();

  popup.innerHTML = `
    <span id="Zekr_Message" style="color: #FFFFFF;">${message}</span>
    <div class="arrow"></div> <!-- Triangle arrow -->
  `;

  popup.onclick = () => popup.remove();

  document.body.appendChild(popup);

  // Define keyframe animation and triangle styles in a <style> tag
  const style = document.createElement("style");
  style.textContent = `
    @keyframes slide-up {
      from {
        transform: translateY(100%); /* Start from below */
      }
      to {
        transform: translateY(0); /* End at the bottom */
      }
    }
    .arrow {
      position: absolute;
      bottom: -4px; /* Position the arrow below the popup */
      right: 10px; /* Align arrow with right edge */

      width: 0;
      height: 0;
      
      border-left: 10px solid transparent;
      border-right: 10px solid transparent;
      border-top: 10px solid #E897B4; /* Match the popup background color */

      rotate: -30deg;
    }
  `;
  document.head.appendChild(style);

  setTimeout(() => {
    if (popup.parentNode) {
      popup.remove();
    }
  }, 60000);
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "createPopup") {
    createPopup();
    chrome.runtime.sendMessage({ action: "setIconPink" });
  }
});
