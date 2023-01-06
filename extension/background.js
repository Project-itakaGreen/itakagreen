let activeSiteData = null;
let lastOriginUrl = "";

chrome.runtime.onInstalled.addListener(function () {
  console.log("Extension has been installed");
});

function getOrigineFromUrl(url) {
  if (url.indexOf("chrome://") != 0 && url.length != 0) {
    const parsedUrl = new URL(url);
    return parsedUrl.origin ;
  }
}

function getDomainData(originUrl) {
  if (originUrl != lastOriginUrl && originUrl != undefined) {
    lastOriginUrl = originUrl;
    // TODO: call api
    console.log("call api with :" + originUrl);
    return {};//objet reçu de l'api
  }
}

chrome.tabs.onActivated.addListener(function (activeInfo) {
  chrome.tabs.get(activeInfo.tabId, function (tab) {
    const activeSiteData = getDomainData(getOrigineFromUrl(tab.url));
  });
 });


chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  const activeSiteData = getDomainData(getOrigineFromUrl(tab.url));
});


// chrome.webRequest.onCompleted.addListener(
//   function(details) {
//     let responseSize = 0;

//     if (details.responseHeaders) {
//       const contentLengthHeader = details.responseHeaders.find(header => header.name.toLowerCase() == "content-length");
//       if (contentLengthHeader) {
//         responseSize = parseInt(contentLengthHeader.value);
//         // console.log(responseSize)
//       }
//     }
//   },
//   {urls: ['<all_urls>']},
//   ["responseHeaders"]
// );



