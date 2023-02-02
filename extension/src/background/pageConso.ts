import { registerNavigationObserverCallback } from './navigationObserver';

import type { navigationObserverCallback } from "./navigationObserver";

const tabWatched: Array<{
  tabId: number;
  domainName: string;
  totalConsoBytes: number;
}> = [];

/**
 * Init the watchers to send the tabs's conso to the popup when needed
 */
export function initPageConso() {
  registerNavigationObserverCallback(watchTab);
  chrome.runtime.onMessage.addListener(async function (request) {
    if (request.message === "getPageConso") {
      sendToPopup("updatePageConso", tabWatched);
    }
  });
}

/**
 * Register the sum of all tabs data usage;
 */
const watchTab: navigationObserverCallback = function (details) {
  let workingTab = tabWatched.find((e) => e.tabId === details.tabId);
  if (workingTab) {
    if (workingTab.domainName === details.domainName) {
      workingTab.totalConsoBytes += details.responseSize;
    } else {
      workingTab.totalConsoBytes = details.responseSize;
      workingTab.domainName = details.domainName;
    }
  } else {
    workingTab = {
      tabId: details.tabId,
      domainName: details.domainName,
      totalConsoBytes: details.responseSize,
    };
    tabWatched.push(workingTab);
  }
  sendToPopup("updatePageConso", tabWatched);
};

/**
 * Send all tab/domain data usage
 */
function sendToPopup(message: string, data: any): void {
  chrome.runtime.sendMessage({ message: message, data: data }).catch((e) => {
    //popup closed
  });
}
