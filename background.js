// Function to create the context menu item
function createContextMenu() {
  chrome.contextMenus.create({
    id: "saveHighlight",
    title: "Save Highlight to SnapNote",
    contexts: ["selection"]
  });
}

// Try to remove existing context menu item
chrome.contextMenus.remove("saveHighlight", function() {
  if (chrome.runtime.lastError) {
    // Handle error if the item doesn't exist (ignore if it's the first time)
    console.warn("Error removing context menu item:", chrome.runtime.lastError.message);
  }
  
  // After removal attempt, create the new context menu item
  createContextMenu();
});

// Handle clicks on the context menu item
chrome.contextMenus.onClicked.addListener(function(info, tab) {
  if (info.menuItemId === "saveHighlight") {
    const selectedText = info.selectionText;
    if (selectedText) {
      saveHighlight(selectedText);
    }
  }
});

// Function to save the highlighted text
function saveHighlight(text) {
  chrome.storage.local.get({ highlights: [] }, function(result) {
    const highlights = result.highlights;
    highlights.push(text);
    chrome.storage.local.set({ highlights }, function() {
      // Optionally, notify the user or update UI
    });
  });
}
