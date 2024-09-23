// background.js
// console.log('-----------------  background.js')

chrome.runtime.onInstalled.addListener(() => {
    console.log('Extension installed or updated');
  });
  
  // Listen for URL updates
  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.url && changeInfo.url.includes(".yaml")) {
      const splitURL = changeInfo.url.split('/').slice(-1)
      
      chrome.notifications.create({
        type: 'basic',
        iconUrl: '16icon.png',
        title: 'New YAML found!',
        message: `Name: ${splitURL}`,
        buttons: [
          { title: 'Extract' },
          { title: 'Preview' } 
        ],
      });

      function openPopup() {
        console.log('OPEN POPUP')
        chrome.action.setPopup(
          {
            tabId: tabId,
            popup: "index.html" 
          }
        )
      }

      async function sendYaml() {
        console.log('SEND YAML')
        chrome.runtime.sendMessage({text: 'this'})
      }

      chrome.notifications.onButtonClicked.addListener((
        notificationid, 
        buttonIndex
      ) => {
        buttonIndex === 0 
          ? sendYaml()
          : openPopup()
      });
    }

  });
  