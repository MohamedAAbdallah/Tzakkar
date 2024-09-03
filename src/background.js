function triggerPopup() {
  // Query all tabs to send a message to the active tab
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, { action: "createPopup" });
  });
}

// Set a fixed interval for triggering the popup
setInterval(triggerPopup, 15000);
