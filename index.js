// popup.js

document.getElementById('extractButton').addEventListener('click', function() {
    // Trigger a script on content.js based on use click
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        files: ['content.js']
      });
    });

    ( async function yamlDOM() {
        const yaml = await chrome.storage.local.get('data');
        console.log('----------- LOCAL STORAGE YAML', yaml)
        // const yamlDIV = document.createElement('div')
        // yamlDIV.innerText = yamlDIV
        // body.append(yamlDIV)
      }
    )()
  });

  