// index.js

document.getElementById('extractButton').addEventListener('click', function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        files: ['content.js']
      });
    });
  });

  chrome.runtime.onMessage.addListener((message) => {
    if (message.command === 'showInPopup') {
      console.log('------- INDEX>JS')
      document.querySelector('#yaml-section').textContent = message.data;
      document.querySelector('#yaml-name').textContent = 'Message Name';
    }
  });

  