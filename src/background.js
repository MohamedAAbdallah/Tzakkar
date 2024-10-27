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

  const selectedIcons = icons[theme];

  if (selectedIcons) {
    chrome.action.setIcon({
      path: selectedIcons,
    });
  } else {
    console.error("Invalid theme for icon change: ", theme);
  }
}

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

let popupInterval;

function triggerPopup() {
  chrome.storage.local.get("settings", (data) => {
    const settings = data.settings || { theme: "green" };

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      try {
        const activeTab = tabs[0];

        chrome.tabs.sendMessage(activeTab.id, {
          action: "createPopup",
          settings: settings,
        });
      } catch (error) {
        console.error("Tzakkar | Error sending message to active tab: ", error);
      }
    });
  });
}

function setupInterval(interval) {
  clearInterval(popupInterval);
  popupInterval = setInterval(triggerPopup, interval);
}

loadSettings((settings) => {
  changeIconTo(settings.theme);
  setupInterval(settings.interval);
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "updateSettings") {
    const settings = request.settings;
    saveSettings(settings);
    changeIconTo(settings.theme);
    setupInterval(settings.interval);
  }
});
