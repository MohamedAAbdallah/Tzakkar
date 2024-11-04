const defaultSettings = {
  interval: 300000,
  theme: "green",
};

let settings = defaultSettings;

function loadSettings(callback) {
  chrome.storage.local.get("settings", (data) => {
    settings = data.settings || defaultSettings;
    callback(settings);
  });
}

function saveSettings(settings) {
  chrome.storage.local.set({ settings });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "updateSettings") {
    saveSettings(request.settings);
  }
});

chrome.runtime.onConnect.addListener((port) => {
  if (port.name === "popup") {
    console.log("Popup opened");
    settings = port.onDisconnect.addListener(() => {
      console.log("Popup has been closed");
      chrome.runtime.reload();
    });
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

loadSettings((settings) => {
  setInterval(notification, settings.interval);
});
