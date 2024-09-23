// console.log('content.js')
//https://developer.chrome.com/docs/extensions/reference/api/action



(function() {
    // Extract yaml data
    const tbody = document.querySelector('#read-only-cursor-text-area').innerHTML

    fetch('http://localhost:3000/api/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content: tbody })
      })
      .then(response => response.json())
      .then(data => console.log('Content sent successfully:', data))
      // .catch(error => console.error('Error sending content:', error))
    
  })();

 
  