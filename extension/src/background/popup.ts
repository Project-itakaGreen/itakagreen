// init the data of api for the active tab
export let activeSiteDomain: string | null = null;
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
      activeSiteDomain = getOrigineFromUrl(tab.url);
    });
  });

  // get the url of loaded tab
  chrome.tabs.onUpdated.addListener(function (tabId: number, changeInfo, tab) {
    activeSiteDomain = getOrigineFromUrl(tab.url);
  });

  chrome.runtime.onMessage.addListener(function (
    request,
    sender,
    sendResponse
  ) {
    if (request.type === "getActiveSiteDomain") {
      sendResponse({ activeSiteDomain: activeSiteDomain });
    }
  });
}

// get the origin of the url
function getOrigineFromUrl(url: string) {
  if (url.indexOf("chrome://") != 0 && url.length != 0) {
    const parsedUrl = new URL(url);
    return parsedUrl.origin;
  }
}