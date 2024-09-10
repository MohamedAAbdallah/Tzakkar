// Test mode variable
let testMode = true; // Set to true to enable test mode (5 seconds interval)

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

// Function to trigger the popup
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

// Function to set up the interval for triggering the popup
let popupInterval;

function setupInterval() {
  clearInterval(popupInterval); // Clear any existing interval
  const interval = testMode ? 5000 : 15000; // 5 seconds if test mode is enabled, 15 seconds otherwise
  popupInterval = setInterval(triggerPopup, interval);
}

// Initialize the interval when the extension loads
setupInterval();
