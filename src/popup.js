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
    intervalminutes = Math.round(settings.interval / 1000 / 60);
    document.getElementById("counter").innerText = `${intervalminutes} minutes`;
  }

  document.getElementById("interval").addEventListener("input", () => {
    saveSettings();
  });

  document.getElementById("theme").addEventListener("change", () => {
    saveSettings();
  });
});
