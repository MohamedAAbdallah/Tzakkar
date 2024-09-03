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

  // Select icons based on the chosen color
  const selectedIcons = icons[color];

  if (selectedIcons) {
    chrome.action.setIcon({
      path: selectedIcons,
    });
  }
}

// Example: Change icon color based on some event
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "setIconGreen") {
    changeIconTo("green");
  } else if (request.action === "setIconPink") {
    changeIconTo("pink");
  }
});

function triggerPopup() {
  // Query all tabs to send a message to the active tab
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    try {
      // Send a message to the active tab
      const activeTab = tabs[0];
      chrome.tabs.sendMessage(activeTab.id, { action: "createPopup" });
    } catch (error) {
      console.log("Tazakr | Error sending message to active tab:", error);
    }
  });
}

// Set a fixed interval for triggering the popup
setInterval(triggerPopup, 15000);
