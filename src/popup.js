// TODO: Implement checkboxes for theme buttons
// TODO: implement palcement for popup
// TODO: New UI
// TODO: new data from rana
// TODO: Test

document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.local.get("settings", (data) => {
    const settings = data.settings || {};
    document.getElementById("interval").value = settings.interval || 300000;
    document.getElementById("theme").value = settings.theme || "green";
  });

  function saveSettings() {
    const settings = {
      interval: parseInt(document.getElementById("interval").value, 10),
      theme: document.getElementById("theme").value,
    };

    chrome.storage.local.set({ settings }, () => {
      chrome.runtime.sendMessage({ action: "updateSettings", settings });
    });
  }

  document.getElementById("interval").addEventListener("input", () => {
    saveSettings();
  });

  document.getElementById("theme").addEventListener("change", () => {
    saveSettings();
  });
});
