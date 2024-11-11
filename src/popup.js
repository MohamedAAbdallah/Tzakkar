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

  const selectedIcons = icons[theme.toLowerCase()];

  if (selectedIcons) {
    chrome.action.setIcon({ path: selectedIcons });
  } else {
    console.error("Invalid theme for icon change:", theme);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const port = chrome.runtime.connect({ name: "popup" });

  const intervalInput = document.getElementById("interval");
  const themeRadioButtons = document.querySelectorAll("input[name='theme']");
  const counterLabel = document.getElementById("counter");
  const enabledCheckbox = document.getElementById("enabled"); 
  const languageSelect = document.getElementById("language"); 

  chrome.storage.local.get("settings", (data) => {
    const settings = data.settings || {
      interval: 300000,
      theme: "green",
      enabled: true,
      language: "ar", 
    };

    intervalInput.value = settings.interval;

    themeRadioButtons.forEach((radio) => {
      if (radio.value === settings.theme) {
        radio.checked = true;
      }
    });

    if (enabledCheckbox) {
      enabledCheckbox.checked = settings.enabled;
    }

    if (languageSelect) {
      languageSelect.value = settings.language;
    }

    counterLabel.innerText = `${(settings.interval / 60000).toFixed(
      1
    )} minutes`;

    changeIconTo(settings.theme);
  });

  function saveSettings() {
    const selectedTheme =
      Array.from(themeRadioButtons).find((radio) => radio.checked)?.value ||
      "green";

    const intervalValue = parseInt(intervalInput.value, 10);

    if (isNaN(intervalValue) || intervalValue <= 0) {
      console.error("Invalid interval value:", intervalInput.value);
      return;
    }

    const enabledValue = enabledCheckbox ? enabledCheckbox.checked : true;

    const languageValue = languageSelect ? languageSelect.value : "ar";

    const settings = {
      interval: intervalValue,
      theme: selectedTheme,
      enabled: enabledValue,
      language: languageValue,
    };

    chrome.storage.local.set({ settings }, () => {
      chrome.runtime.sendMessage({ action: "updateSettings", settings });

      changeIconTo(selectedTheme);
    });

    counterLabel.innerText = `${(intervalValue / 60000).toFixed(1)} minutes`;
  }

  intervalInput.addEventListener("input", saveSettings);
  themeRadioButtons.forEach((radio) => {
    radio.addEventListener("change", saveSettings);
  });
  if (enabledCheckbox) {
    enabledCheckbox.addEventListener("change", saveSettings);
  }
  if (languageSelect) {
    languageSelect.addEventListener("change", saveSettings);
  }
});
