// console.log('content.js')
//https://developer.chrome.com/docs/extensions/reference/api/action

function extractYaml() {
  const rows = document.querySelectorAll('tbody tr')
  
  if(rows.length === 0) {
    return document.querySelector('#read-only-cursor-text-area').innerHTML
  }

  let yamlContent = ''

  rows.forEach(row => {
    const contentCell = row.querySelector('td.blob-code');
    if(contentCell) {
      yamlContent += contentCell.textContent.trim() + '\n'
    }
  })
  return yamlContent
}



(function() {
    // Extract yaml data
    const extractedYaml = extractYaml()

    fetch('http://localhost:3000/api/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content: extractedYaml })
      })
      .then(response => response.json())
      .then(data => console.log('Content sent successfully:', data))
      // .catch(error => console.error('Error sending content:', error))
    
  })();

 
  