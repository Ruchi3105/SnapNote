// eventPage.js

// Listener for when the extension is installed or updated
chrome.runtime.onInstalled.addListener(() => {
    // Create context menu item
    chrome.contextMenus.create({
      id: "addNote",
      title: "Save to notes",
      contexts: ["selection"] // Show context menu only when text is selected
    });
  });
  
  // Listener for when a context menu item is clicked
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    // Check if the clicked item is our "addNote" context menu
    if (info.menuItemId === "addNote" && info.selectionText) {
      // Send message to the active tab to handle the selected text
      chrome.tabs.sendMessage(tab.id, { action: "addNote", text: info.selectionText });
    }
  });
  