const defaultSettings = {
  interval: 300000,
  theme: "green",
  enabled: true,
  language: "ar",
};

let settings = defaultSettings;
let notificationInterval;

function loadSettings(callback) {
  chrome.storage.local.get("settings", (data) => {
    settings = data.settings || defaultSettings;
    callback(settings);
  });
}

function saveSettings(newSettings) {
  chrome.storage.local.set({ settings: newSettings });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "updateSettings") {
    saveSettings(request.settings);
    settings = request.settings;
    startNotificationInterval();
  }
});

chrome.runtime.onConnect.addListener((port) => {
  if (port.name === "popup") {
    console.log("Popup opened");
    port.onDisconnect.addListener(() => {
      console.log("Popup has been closed");
      chrome.runtime.reload();
    });
  }
});

function getMessageData() {
  const messages = {
    ar: [
      "الْلَّهُم صَلِّ وَسَلِم وَبَارِك عَلَى سَيِّدِنَا مُحَمَّد",
      "استغفر الله وأتوب إليه",
      "سبحان الله وبحمده",
      "لا إله إلا الله",
      "الحمد لله",
      "الله أكبر",
      "سبحان الله",
      "اللهم إني أسألك العفو والعافية",
      "اللهم إني أسألك العلم النافع",
      "اللهم إني أسألك الهدى والتقى والعفاف والغنى",
      "اللهم إني أسألك الجنة وأعوذ بك من النار",
      "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ، سُبْحَانَ اللَّهِ الْعَظِيمِ",
      "الْحَمْدُ لِلَّهِ حَمْدًا كَثِيرًا طَيِّبًا مُبَارَكًا فِيهِ",
    ],
    en: [
      "There is no deity but Allah",
      "All praise is due to Allah",
    ],
  };

  const langMessages = messages[settings.language] || messages["ar"];
  return langMessages[Math.floor(Math.random() * langMessages.length)];
}

function notification() {
  const message = getMessageData();
  chrome.notifications.create({
    type: "basic",
    iconUrl: `imgs/icons/${settings.theme}/128.png`,
    title: message,
    message: "",
    priority: 2,
  });
}

function startNotificationInterval() {
  if (notificationInterval) {
    clearInterval(notificationInterval);
  }
  if (settings.enabled) {
    notificationInterval = setInterval(notification, settings.interval);
  }
}

loadSettings(() => {
  startNotificationInterval();
});
