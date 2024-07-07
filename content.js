// content.js
document.addEventListener('mouseup', function(event) {
    const selectedText = window.getSelection().toString().trim();
    if (selectedText && event.button === 0) {
      chrome.runtime.sendMessage({ action: "highlightText", text: selectedText });
    }
  });
  