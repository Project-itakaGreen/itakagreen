export type navigationObserverCallback = (details: {
  domainName: string;
  responseSize: number;
  currentTimeInterval: number;
  tabId: number;
}) => void;

const callbacks: Array<navigationObserverCallback> = [];

/**
 * Watch the requests, get the datas and call the callbacks
 */
export function loadNavigationObserver(): void {
  chrome.webRequest.onCompleted.addListener(
    function (details) {
      if (!details.responseHeaders) return;

      const contentLengthHeader = details.responseHeaders.find(
        (header) => header.name.toLowerCase() === "content-length"
      );
      if (!contentLengthHeader) return;

      const responseSize = parseInt(contentLengthHeader.value);
      const currentInterval = getTimeIntervalStart();
      if (!details || details?.initiator?.startsWith("chrome-extension://")) {
        return;
      }

      let domainName = details.initiator || details.url;

      callbacks.forEach((callback: navigationObserverCallback) => {
        callback({
          domainName,
          responseSize,
          currentTimeInterval: currentInterval,
          tabId: details.tabId,
        });
      });
    },
    {
      urls: ["<all_urls>"],
    },
    ["responseHeaders"]
  );
}

/**
 * Register a callback to call when a responce occure
 */
export function registerNavigationObserverCallback(
  callback: navigationObserverCallback
) {
  callbacks.push(callback);
}

/**
 * Return the beginning of the save intervale.
 * As a interval is one houre long, this function
 * return the timestamp for the start of the current hour.
 */
function getTimeIntervalStart(): number {
  const date = new Date();
  date.setMinutes(0, 0, 0);
  return date.getTime() / 1000;
}
