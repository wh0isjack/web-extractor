// index.js

document.getElementById('extractButton').addEventListener('click', function() {
    // Trigger a script on content.js based on user click
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        files: ['content.js']
      });
    });
  });

  