chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({ cursor: "" });
    console.log("Custom Cursor Extension Installed!");
});
