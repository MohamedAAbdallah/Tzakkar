let testMode = true;

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
  }
}

function triggerPopup() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    try {
      const activeTab = tabs[0];
      chrome.tabs.sendMessage(activeTab.id, { action: "createPopup" });
    } catch (error) {
      console.log("Tzakkar | Error sending message to active tab:", error);
    }
  });
}

let popupInterval;

function setupInterval() {
  clearInterval(popupInterval);
  const interval = testMode ? 10000 : 300000;
  popupInterval = setInterval(triggerPopup, interval);
}

setupInterval();
