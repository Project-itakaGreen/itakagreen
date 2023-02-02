import { registerNavigationObserverCallback } from './navigationObserver';

import type { navigationObserverCallback } from "./navigationObserver";
import type { RecordI } from "../interfaces/RecordI";

let db: null | IDBDatabase;

export function initNavigationRegistrer(dbConnection: IDBDatabase) {
  db = dbConnection;
  registerNavigationObserverCallback(saveRequestConsomation);
}

/**
 * The size of the response will be added to the domain usage in the current interval
 * if the record doesn't exist, it will be created
 */
const saveRequestConsomation: navigationObserverCallback = async function (
  details
) {
  const transaction = db.transaction(["records"], "readwrite");
  const objectStore = transaction.objectStore("records");

  // get the corresponding record if it already exist
  const index = objectStore.index("key");

  const request = index.get([details.domainName, details.currentTimeInterval]);

  request.onsuccess = function (event: Event) {
    const record = request.result;
    if (!record) {
      addRecord(
        objectStore,
        details.domainName,
        details.currentTimeInterval,
        details.responseSize
      );
    } else {
      updateRecord(objectStore, record, details.responseSize);
    }
  };
};

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
    console.log("navigationRegistrer| record added");
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
    console.log("navigationRegistrer| record updated");
  };
  request.onerror = function (event: Event) {
    console.error("navigationRegistrer| error updating record");
  };
}
