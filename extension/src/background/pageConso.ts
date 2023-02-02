const tabWatched: Array<any> = [];

/**
 * Send to popup actual all request on page
 */
function sendToPopup(message: string, data: any): void {
  chrome.runtime.sendMessage({ message: message, data: data }).catch((e) => {
    //popup closed
  });
}

export function watchTab(
  responseSize: number,
  domainName: string,
  details: any
) {
  let workingTab = tabWatched.find((e) => e.tabId === details.tabId);
  if (workingTab) {
    if (workingTab.domainName === domainName) {
      workingTab.totalConsoBytes += responseSize;
    } else {
      workingTab.totalConsoBytes = responseSize;
      workingTab.domainName = domainName;
    }
  } else {
    workingTab = {
      tabId: details.tabId,
      domainName,
      totalConsoBytes: responseSize,
    };
    tabWatched.push(workingTab);
  }
  sendToPopup("updatePageConso", tabWatched);
}

chrome.runtime.onMessage.addListener(async function (request) {
  if (request.message === "getPageConso") {
    //getPageConso
    sendToPopup("updatePageConso", tabWatched);
  }
});
