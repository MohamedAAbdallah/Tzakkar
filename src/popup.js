document.addEventListener("DOMContentLoaded", () => {
  const intervalInput = document.getElementById("interval");
  const themeRadioButtons = document.querySelectorAll("input[name='theme']");
  const counterLabel = document.getElementById("counter");

  chrome.storage.local.get("settings", (data) => {
    const settings = data.settings || {};
    intervalInput.value = settings.interval || 300000;

    themeRadioButtons.forEach((radio) => {
      if (radio.value === settings.theme) {
        radio.checked = true;
      }
    });

    counterLabel.innerText = `${(parseInt(intervalInput.value, 10) / 60000).toFixed(1)} minutes`;
  });

  function saveSettings() {
    const selectedTheme = Array.from(themeRadioButtons).find(radio => radio.checked)?.value;
    const settings = {
      interval: parseInt(intervalInput.value, 10),
      theme: selectedTheme,
    };

    chrome.storage.local.set({ settings }, () => {
      chrome.runtime.sendMessage({ action: "updateSettings", settings });
    });
    counterLabel.innerText = `${(parseInt(intervalInput.value, 10) / 60000).toFixed(1)} minutes`;
  }

  intervalInput.addEventListener("input", saveSettings);
  themeRadioButtons.forEach((radio) => radio.addEventListener("change", saveSettings));
});
