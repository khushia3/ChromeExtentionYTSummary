chrome.runtime.onInstalled.addListener(() => {
  console.log('YouTube Summary Generator installed.');
});

chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: {tabId: tab.id},
    function: extractVideoInfo
  });
});

function extractVideoInfo() {
  const videoTitle = document.querySelector('h1.title').innerText;
  const videoDescription = document.querySelector('yt-formatted-string.content').innerText;

  fetch('https://your-summary-api.com/summarize', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({title: videoTitle, description: videoDescription})
  })
  .then(response => response.json())
  .then(data => {
    chrome.runtime.sendMessage({summary: data.summary});
  })
  .catch(error => console.error('Error:', error));
}
