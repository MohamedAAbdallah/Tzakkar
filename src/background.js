function changeIconTo(theme) {
  const icons = {
    green: {
      16: "icons/Green16.png",
      32: "icons/Green32.png",
      48: "icons/Green48.png",
      128: "icons/Green128.png",
    },
    pink: {
      16: "icons/Pink16.png",
      32: "icons/Pink32.png",
      48: "icons/Pink48.png",
      128: "icons/Pink128.png",
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
