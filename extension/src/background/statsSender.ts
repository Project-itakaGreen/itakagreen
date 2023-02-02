import { getToken, isTokenValid } from './token';

import type { RecordI } from "../interfaces/RecordI";

/**
 * Send the conso to the server regulary
 */
export async function loadStatsSender(db: IDBDatabase) {
  // todo remove the remove
  chrome.storage.local.remove("lastSynchronizationDate");
  logLastSynchronisation();

  const isTime = await shouldSendStats();
  if (!isTime) return;

  const token = await getToken();

  if (isTokenValid(token)) {
    sendStats(db, token as string);
  }
}

/**
 * Send the conso to the server
 */
async function sendStats(db: IDBDatabase, token: string) {
  const records = (await getAllRecords(db)) as RecordI[];

  const urlSendpoint = process.env.API_URL + "/record/many/";
  fetch(urlSendpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(records),
  })
    .then(function (response) {
      if (response.ok) {
        console.log("statsSender| Stats sent");
        clearDb(db);
        updateLastStatsSend();
      } else {
        throw new Error("statsSender| The backend send an error.");
      }
    })
    .catch(function (error) {
      console.warn("statsSender| Error while sending stats: " + error);
    });
}

/**
 * Get the conso records from the local indexedDb
 */
function getAllRecords(db: IDBDatabase): Promise<RecordI[]> {
  const transaction = db.transaction(["records"], "readonly");
  const objectStore = transaction.objectStore("records");
  const promiseRecords: Promise<RecordI[]> = new Promise((resolve, reject) => {
    const request = objectStore.getAll();
    request.onsuccess = function (event: Event) {
      resolve(request.result);
    };
    request.onerror = function (event: Event) {
      console.error("statsSender| Error while getting all records");
      reject([]);
    };
  });

  return promiseRecords;
}

/**
 * Delete all the records from the local indexedDB
 */
function clearDb(db: IDBDatabase) {
  const transaction = db.transaction(["records"], "readwrite");
  const objectStore = transaction.objectStore("records");
  const request = objectStore.clear();
  request.onsuccess = function (event) {
    console.log("statsSender| DB cleared");
  };
}

/**
 * Update the date of the last synchronisation
 */
function updateLastStatsSend() {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  const dayInMs = date.getTime();
  chrome.storage.local.set({
    lastSynchronizationDate: dayInMs,
  });
}

/**
 * Return if the data should be send as a boolean
 */
function shouldSendStats(): Promise<boolean> {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  const dayInMs = date.getTime();

  return new Promise<boolean>((resolve, reject) => {
    chrome.storage.local.get("lastSynchronizationDate", function (result) {
      resolve(result.lastSynchronizationDate != dayInMs);
    });
  });
}

/**
 * log the synchronisation to the server
 */
function logLastSynchronisation() {
  chrome.storage.local.get("lastSynchronizationDate", function (result) {
    if (!result.lastSynchronizationDate) {
      console.log(
        "statsSender| There are no synchronization registred in the logs"
      );
    } else {
      const date = new Date(result.lastSynchronizationDate);
      console.log(
        "statsSender| lastSynchronizationDate from " +
          date.getDate() +
          "/" +
          date.getMonth() +
          "/" +
          date.getFullYear()
      );
    }
  });
}
