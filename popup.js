document.getElementById('generate-summary').addEventListener('click', () => {
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    const tab = tabs[0];
    chrome.tabs.sendMessage(tab.id, {action: "getVideoInfo"}, (response) => {
      fetch('https://your-summary-api.com/summarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(response)
      })
      .then(res => res.json())
      .then(data => {
        document.getElementById('summary-content').innerText = data.summary;
      })
      .catch(error => console.error('Error:', error));
    });
  });
});
