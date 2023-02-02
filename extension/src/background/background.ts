import { dbConnection } from './dbConnection';
import { loadInfoDomain } from './domain';
import { loadNavigationObserver } from './navigationObserver';
import { initNavigationRegistrer } from './navigationRegistrer';
import { initPageConso } from './pageConso';
import { loadStatsSender } from './statsSender';

(async () => {
  const db = await dbConnection();
  loadNavigationObserver();
  if (db instanceof IDBDatabase) {
    initNavigationRegistrer(db);
    loadStatsSender(db);
    loadInfoDomain(db);
    initPageConso();
  }
})();
