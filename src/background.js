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

function getMessageData(callback) {
  fetch(chrome.runtime.getURL(`lang/${settings.language}.json`))
    .then((response) => response.json())
    .then((messages) => {
      if (messages.length === 0) {
        callback("No messages available");
      } else {
        const message = messages[Math.floor(Math.random() * messages.length)];
        callback(message);
      }
    })
    .catch((error) => {
      console.error(
        `Error loading messages for language ${settings.language}:`,
        error
      );
      callback("Default message in case of error");
    });
}

function notification() {
  getMessageData((message) => {
    chrome.notifications.create({
      type: "basic",
      iconUrl: `imgs/icons/${settings.theme}/128.png`,
      title: message,
      message: "",
      priority: 2,
    });
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

function changeIconTo(theme) {
  const icons = {
    green: {
      16: "imgs/icons/Green/16.png",
      32: "imgs/icons/Green/32.png",
      48: "imgs/icons/Green/48.png",
      128: "imgs/icons/Green/128.png",
    },
    pink: {
      16: "imgs/icons/Pink/16.png",
      32: "imgs/icons/Pink/32.png",
      48: "imgs/icons/Pink/48.png",
      128: "imgs/icons/Pink/128.png",
    },
  };

  const selectedIcons = icons[theme.toLowerCase()];

  if (selectedIcons) {
    chrome.action.setIcon({ path: selectedIcons });
  } else {
    console.error("Invalid theme for icon change:", theme);
  }
}

loadSettings(() => {
  startNotificationInterval();
  changeIconTo(settings.theme);
});
