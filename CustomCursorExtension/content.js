chrome.storage.local.get("cursor", function (data) {
    if (data.cursor) {
        document.documentElement.style.cursor = `url(${chrome.runtime.getURL(data.cursor)}), auto`;
    }
});

// Listen for changes and update cursor
chrome.storage.onChanged.addListener(function (changes) {
    if (changes.cursor) {
        document.documentElement.style.cursor = changes.cursor.newValue
            ? `url(${chrome.runtime.getURL(changes.cursor.newValue)}), auto`
            : "auto";
    }
});
