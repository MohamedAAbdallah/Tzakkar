document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.local.get("settings", (data) => {
    const settings = data.settings || {};
    document.getElementById("interval").value = settings.interval || 300000;
    document.getElementById("color").value = settings.color || "green";
  });

  document.getElementById("saveSettings").addEventListener("click", () => {
    const settings = {
      interval: parseInt(document.getElementById("interval").value, 10),
      color: document.getElementById("color").value,
    };

    chrome.storage.local.set({ settings }, () => {
      chrome.runtime.sendMessage({ action: "updateSettings", settings });
      window.close();
    });
  });
});
