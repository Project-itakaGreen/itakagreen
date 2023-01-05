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
        const currrentInterval = getTimeIntervalStart();
        console.log(responseSize)
      }
    }
  },
  {urls: ['<all_urls>']},
  ["responseHeaders"]
);

/**
 * Return the beginning of the save intervale as a timestamp
 * as a interval is one houre long this function
 * return the timestamp for the start of the current hour.
 */
function getTimeIntervalStart() {
  const date = new Date()
  date.setMinutes(0, 0, 0)
  return date.getTime()/1000;
}
