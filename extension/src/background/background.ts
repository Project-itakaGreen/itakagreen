import { dbConnection } from './dbConnection';
import { loadInfoDomain } from './domain';
import { saveNavigationData } from './saveNavigationData';
import { loadStatsSender } from './statsSender';

let db: null | IDBDatabase;

(async () => {
  db = await dbConnection();
  if (db instanceof IDBDatabase) {
    saveNavigationData(db);
    loadStatsSender(db);
    loadInfoDomain(db);
  }
})();