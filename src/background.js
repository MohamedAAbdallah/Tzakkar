function changeIconTo(color) {
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

  const selectedIcons = icons[color];

  if (selectedIcons) {
    chrome.action.setIcon({
      path: selectedIcons,
    });
  } else {
    console.error("Invalid color for icon change: ", color);
  }
}

const defaultSettings = {
  interval: 300000,
  color: "green",
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
    const settings = data.settings || { color: "green" };

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      try {
        const activeTab = tabs[0];
        let actionType =
          settings.color === "green" ? "createPopupGreen" : "createPopupPink";

        chrome.tabs.sendMessage(activeTab.id, {
          action: actionType,
        });
      } catch (error) {
        console.log("Tzakkar | Error sending message to active tab:", error);
      }
    });
  });
}

function setupInterval(interval) {
  clearInterval(popupInterval);
  popupInterval = setInterval(triggerPopup, interval);
}

loadSettings((settings) => {
  changeIconTo(settings.color);
  setupInterval(settings.interval);
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "updateSettings") {
    const settings = request.settings;
    saveSettings(settings);
    changeIconTo(settings.color);
    setupInterval(settings.interval);
  }
});
