chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getVideoInfo") {
    const videoTitle = document.querySelector('h1.title').innerText;
    const videoDescription = document.querySelector('yt-formatted-string.content').innerText;
    sendResponse({title: videoTitle, description: videoDescription});
  }
});
