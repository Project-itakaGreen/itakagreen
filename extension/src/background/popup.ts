// init the data of api for the active tab
let activeSiteData = null;
// init the last origin url
let lastOriginUrl = "";

export function loadPopup() {
  // check if the extension is installed or updated
  chrome.runtime.onInstalled.addListener(function () {
    console.log("Extension has been installed");
  });

  // get the url of the active tab
  chrome.tabs.onActivated.addListener(function (activeInfo) {
    chrome.tabs.get(activeInfo.tabId, function (tab) {
      const activeSiteData = getDomainData(getOrigineFromUrl(tab.url));
    });
  });

  // get the url of loaded tab
  chrome.tabs.onUpdated.addListener(function (tabId: number, changeInfo, tab) {
    const activeSiteData = getDomainData(getOrigineFromUrl(tab.url));
  });
}

// get the origin of the url
function getOrigineFromUrl(url: string) {
  if (url.indexOf("chrome://") != 0 && url.length != 0) {
    const parsedUrl = new URL(url);
    return parsedUrl.origin;
  }
}

//verify if the url is the same as the last one
function getDomainData(originUrl: string) {
  if (originUrl != lastOriginUrl && originUrl != undefined) {
    lastOriginUrl = originUrl;
    // TODO: call api
    console.log("call api with :" + originUrl);
    return {}; //object with the data of api
  }
}
