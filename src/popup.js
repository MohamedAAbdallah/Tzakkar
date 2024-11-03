function changeIconTo(theme) {
  const icons = {
    green: {
      16: "imgs/icons/Green/16.png",
      32: "imgs/icons/Green/32.png",
      48: "imgs/icons/Green/48.png",
      128: "imgs/icons/Green/128.png",
    },
    pink: {
      16: "imgs/icons/Pink/16.png",
      32: "imgs/icons/Pink/32.png",
      48: "imgs/icons/Pink/48.png",
      128: "imgs/icons/Pink/128.png",
    },
  };

  const selectedIcons = icons[theme];

  if (selectedIcons) {
    chrome.action.setIcon({
      path: selectedIcons,
    });
  } else {
    console.error("Invalid theme for icon change: ", theme);
  }
}

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

    counterLabel.innerText = `${(
      parseInt(intervalInput.value, 10) / 60000
    ).toFixed(1)} minutes`;
  });

  function saveSettings() {
    const selectedTheme = Array.from(themeRadioButtons).find(
      (radio) => radio.checked
    )?.value;
    const settings = {
      interval: parseInt(intervalInput.value, 10),
      theme: selectedTheme,
    };

    chrome.storage.local.set({ settings }, () => {
      chrome.runtime.sendMessage({ action: "updateSettings", settings });
    });
    counterLabel.innerText = `${(
      parseInt(intervalInput.value, 10) / 60000
    ).toFixed(1)} minutes`;
  }

  intervalInput.addEventListener("input", saveSettings);
  themeRadioButtons.forEach((radio) =>
    radio.addEventListener("change", saveSettings)
  );
});
