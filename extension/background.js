chrome.runtime.onInstalled.addListener(function () {
  console.log("its ok ");


});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  url = tab.url;
  console.log('url de base: ' + url);

  var url = url;
  var regex = /^(https?:\/\/)?([\w.-]+\.[a-z]{2,6})/;
  var match = url.match(regex);

  if (match) {

    urlForApi = match[0]
    console.log('le bon Url: ' + urlForApi)
  }

});


