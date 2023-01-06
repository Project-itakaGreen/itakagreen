// init the data of api for the active tab  
let activeSiteData = null;
// init the last origin url
let lastOriginUrl = "";


// check if the extension is installed or updated
chrome.runtime.onInstalled.addListener(function () {
  console.log("Extension has been installed");
});

// get the origin of the url
function getOrigineFromUrl(url) {
  if (url.indexOf("chrome://") != 0 && url.length != 0) {
    const parsedUrl = new URL(url);
    return parsedUrl.origin ;
  }
}

//verify if the url is the same as the last one
function getDomainData(originUrl) {
  if (originUrl != lastOriginUrl && originUrl != undefined) {
    lastOriginUrl = originUrl;
    // TODO: call api
    console.log("call api with :" + originUrl);
    return {};//object with the data of api
  }
}

// get the url of the active tab
chrome.tabs.onActivated.addListener(function (activeInfo) {
  chrome.tabs.get(activeInfo.tabId, function (tab) {
    const activeSiteData = getDomainData(getOrigineFromUrl(tab.url));
  });
 });

//  get the url of loaded tab 
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



