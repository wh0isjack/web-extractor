// background.js
// console.log('-----------------  background.js')

chrome.runtime.onInstalled.addListener(() => {
    console.log('Extension installed or updated');
  });
  
  // Listen for URL updates
  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.url && changeInfo.url.includes(".yaml") && !changeInfo.url.includes('login')) {
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

      function showYaml() {
        console.log('OPEN POPUP')
        // chrome.action.setPopup(
        //   {
        //     tabId: tabId,
        //     popup: "index.html"
        //   }
        // )
        chrome.scripting.executeScript({
          target: { tabId: tabId },
          files: ['content.js']
        }, () => {
          chrome.tabs.sendMessage(tabId, { command: 'showYaml', data: { splitURL }}, function(response) {
            console.log('Response from content script:', response);
          });
        }); 
      }

      function processYaml() {

        console.log('SEND YAML');
        chrome.runtime.sendMessage({ command: 'processYaml' });
      }      

      chrome.notifications.onButtonClicked.addListener((
        notificationid, 
        buttonIndex
      ) => {
        buttonIndex === 0 
          ? processYaml()
          : showYaml()
      });
    }

  });
  