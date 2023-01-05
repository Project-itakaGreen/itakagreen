"use strict";

let db;
const DBOpenRequest = indexedDB.open("records", 9);
DBOpenRequest.onerror = function (event) {
  console.error("error opening db");
};
DBOpenRequest.onupgradeneeded = setupDB;
DBOpenRequest.onsuccess = function (event) {
  db = event.target.result;
  watchRequests();
};

/**
 * Watch the requests to log the responses size
 */
function watchRequests(){
  chrome.webRequest.onCompleted.addListener(
    function(details) {
      if (!details.responseHeaders) return;
      
      const contentLengthHeader = details.responseHeaders.find(header => header.name.toLowerCase() == "content-length");
      if (!contentLengthHeader) return;

      const responseSize = parseInt(contentLengthHeader.value);
      const currrentInterval = getTimeIntervalStart();
      saveData(responseSize, currrentInterval, details.initiator);
    },
    {urls: ['<all_urls>']},
    ["responseHeaders"]
  );
}

/**
 * The size of the response will be added to the domain usage in the current interval
 * if the record doesn't exist, it will be created
 */
async function saveData(responseSize, curentInterval, domain) {
  const transaction = db.transaction(["records"], "readwrite");
  const objectStore = transaction.objectStore("records");

  // get the corresponding record if it already exist
  const index = objectStore.index("key");
  const request = index.get([domain, curentInterval]);
  request.onsuccess = function (event) {
  const record = event.target.result;
    if(!record){
      addRecord(objectStore, domain, curentInterval, responseSize);
    } else {
      updateRecord(objectStore, record, responseSize);
    }
  };
}

/**
 * Create a new record in the db
 */
function addRecord(objectStore, domain, interval, size) {
  const record = {
    domain: domain,
    interval: interval,
    bytes: size,
  };

  const request = objectStore.add(record);
  request.onsuccess = function (event) {
    console.log("record added");
  }
}

/**
 * Update an existing record to increases the size
 */
function updateRecord(objectStore, record, size) {
  record.bytes += size;
  const request = objectStore.put(record);
  request.onsuccess = function (event) {
    console.log("record updated");
  }
  request.onerror = function (event) {
    console.error("error updating record");
  }
}

/**
 * Setup the database on 'onupgradeneeded' event
 */
function setupDB(event) {
  const db = event.target.result;
  db.deleteObjectStore("records");
  const objectStore = db.createObjectStore("records", { keyPath: "id", autoIncrement: true });
  objectStore.createIndex("key", ["domain", "interval"], { unique: true });
  objectStore.createIndex("domain", "domain", { unique: false });
  objectStore.createIndex("interval", "interval", { unique: false });
  objectStore.createIndex("bytes", "bytes", { unique: false });
}

/**
 * Return the beginning of the save intervale.
 * As a interval is one houre long, this function
 * return the timestamp for the start of the current hour.
 */
function getTimeIntervalStart() {
  const date = new Date()
  date.setMinutes(0, 0, 0)
  return date.getTime()/1000;
}

/**
 * display all records
 */
function displayAllRecords() {
  const transaction = db.transaction(["records"], "readonly");
  const objectStore = transaction.objectStore("records");
  const request = objectStore.getAll();
  request.onsuccess = function (event) {
    console.log(event.target.result);
  }
}