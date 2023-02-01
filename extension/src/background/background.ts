import { dbConnection } from './dbConnection';
import { loadInfoDomain } from './domain';
import { saveNavigationData } from './saveNavigationData';
import { loadStatsSender } from './statsSender';

(async () => {
  const db = await dbConnection();
  if (db instanceof IDBDatabase) {
    saveNavigationData(db);
    loadStatsSender(db);
    loadInfoDomain();
  }
})();
