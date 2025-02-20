document.querySelectorAll(".cursor-option").forEach(item => {
    item.addEventListener("click", function() {
        let cursorImage = this.getAttribute("src");

        chrome.storage.local.set({ cursor: cursorImage }, function() {
            console.log("Cursor changed to:", cursorImage);

            // Apply cursor immediately to the popup
            document.documentElement.style.cursor = `url(${chrome.runtime.getURL(cursorImage)}), auto`;
        });

        // Send message to content script to change cursor
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                func: (cursor) => {
                    document.documentElement.style.cursor = `url(${cursor}), auto`;
                },
                args: [chrome.runtime.getURL(cursorImage)]
            });
        });
    });
});

// Reset Cursor
document.getElementById("resetCursor").addEventListener("click", function() {
    chrome.storage.local.set({ cursor: "" }, function() {
        console.log("Cursor reset to default");

        // Reset cursor on current page
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                func: () => {
                    document.documentElement.style.cursor = "auto";
                }
            });
        });
    });
});
