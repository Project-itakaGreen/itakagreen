import { dbConnection } from './dbConnection';
import { loadInfoDomain } from './domain';
import { loadPopup } from './popup';
import { saveNavigationData } from './saveNavigationData';
import { loadStatsSender } from './statsSender';

let db: null | IDBDatabase;

(async () => {
  loadPopup();
  db = await dbConnection();
  if (db instanceof IDBDatabase) {
    saveNavigationData(db);
    loadStatsSender(db);
    loadInfoDomain(db);
  }
})();

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  if (request.type === "getDb") {
    console.log("getDbBg",db)
    sendResponse(db);
  }
});