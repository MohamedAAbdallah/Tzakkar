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
    "الْحَمْدُ لِلَّهِ حَمْدًا كَثِيرًا طَيِّبًا مُبَارَكًا فِيهِ.",
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

  popup.style = `
    // @import url('https://fonts.googleapis.com/css2?family=Lalezar&display=swap');

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
    background-color: #E897B4; /* TODO: Make Dynamic */
    
    border-radius: 1.5rem;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);

    font-family: Arial, sans-serif;
    font-size: 1.3rem !important;

    max-width: 90%;
    // width: 20rem;
    display: flex;
    flex-direction: column;
    align-items: start;

    z-index: 2147483647;
    cursor: pointer;
  `;

  const title = "Zekr";
  const message = get_message_data();

  popup.innerHTML = `
    <span id="Zekr_Message" style="color: #FFFFFF;">${message}</span>
  `;

  popup.onclick = () => popup.remove();

  document.body.appendChild(popup);

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
