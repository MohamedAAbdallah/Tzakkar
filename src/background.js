const defaultSettings = {
  interval: 300000,
  theme: "green",
};

function loadSettings(callback) {
  chrome.storage.local.get("settings", (data) => {
    const settings = data.settings || defaultSettings;
    callback(settings);
  });
}

function saveSettings(settings) {
  chrome.storage.local.set({ settings });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "updateSettings") {
    const settings = request.settings;
    saveSettings(settings);
  }
});

function getMessageData() {
  const messages = [
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

function notification() {
  const message = getMessageData();
  chrome.notifications.create({
    type: "basic",
    iconUrl: "imgs/icons/green/128.png",
    title: message,
    message: "",
    priority: 2,
  });
}

setInterval(notification, 600000); // 10 minutes
