chrome.runtime.onInstalled.addListener(function () {
  console.log("its ok ");


});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  url = tab.url;

  var url = url;
  var regex = /^(https?:\/\/)?([\w.-]+\.[a-z]{2,6})/;
  var match = url.match(regex);

  if (match) {
    urlForApi = match[0]
    console.log('le bon Url: ' + urlForApi)
  }

});


chrome.webRequest.onCompleted.addListener(
  function(details) {
    let responseSize = 0;

    if (details.responseHeaders) {
      const contentLengthHeader = details.responseHeaders.find(header => header.name.toLowerCase() == "content-length");
      if (contentLengthHeader) {
        responseSize = parseInt(contentLengthHeader.value);
        console.log(responseSize)
      }
    }
  },
  {urls: ['<all_urls>']},
  ["responseHeaders"]
);

