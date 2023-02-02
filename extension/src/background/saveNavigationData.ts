import type { RecordI } from "../interfaces/RecordI";

let db: null | IDBDatabase;

export function saveNavigationData(dbConnection: IDBDatabase) {
  db = dbConnection;
  // Watch the requests to log the responses size
  chrome.webRequest.onCompleted.addListener(
    function (details) {
      if (!details.responseHeaders) return;

      const contentLengthHeader = details.responseHeaders.find(
        (header) => header.name.toLowerCase() == "content-length"
      );
      if (!contentLengthHeader) return;

      const responseSize = parseInt(contentLengthHeader.value);
      const currentInterval = getTimeIntervalStart();

      if (details.initiator.startsWith("chrome-extension://")) {
        return;
      }

      let domainName = details.initiator || details.url;
      saveData(responseSize, currentInterval, domainName);
    },
    {
      urls: ["<all_urls>"],
    },
    ["responseHeaders"]
  );
}

/**
 * The size of the response will be added to the domain usage in the current interval
 * if the record doesn't exist, it will be created
 */
async function saveData(
  responseSize: number,
  currentInterval: number,
  domainName: string
) {
  const transaction = db.transaction(["records"], "readwrite");
  const objectStore = transaction.objectStore("records");

  // get the corresponding record if it already exist
  const index = objectStore.index("key");

  const request = index.get([domainName, currentInterval]);
  request.onsuccess = function (event: Event) {
    const record = request.result;
    if (!record) {
      addRecord(objectStore, domainName, currentInterval, responseSize);
    } else {
      updateRecord(objectStore, record, responseSize);
    }
  };
}

/**
 * Create a new record in the db
 */
function addRecord(
  objectStore: IDBObjectStore,
  domainName: string,
  timeInterval: number,
  size: number
) {
  const record: RecordI = {
    domainName: domainName,
    timeInterval: timeInterval,
    bytes: size,
  };

  const request = objectStore.add(record);
  request.onsuccess = function (event: Event) {
    console.log("record added");
  };
}

/**
 * Update an existing record to increases the size
 */
function updateRecord(
  objectStore: IDBObjectStore,
  record: RecordI,
  size: number
) {
  record.bytes += size;
  const request = objectStore.put(record);
  request.onsuccess = function (event: Event) {
    console.log("record updated");
  };
  request.onerror = function (event: Event) {
    console.error("error updating record");
  };
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
