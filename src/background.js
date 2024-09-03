function triggerMessage() {
  chrome.scripting.executeScript({
    target: { allFrames: true },
    files: ["content.js"],
  });
}

// Set a fixed interval of 15 seconds for triggering the popup
setInterval(triggerMessage, 15000);
