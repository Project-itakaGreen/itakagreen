import { dbConnection } from './dbConnection';
import { loadPopup } from './popup';
import { saveNavigationData } from './saveNavigationData';
import { loadStatsSender } from './statsSender';

(async () => {
	loadPopup();
	const db = await dbConnection();
  if(db instanceof IDBDatabase) {
    saveNavigationData(db);
    loadStatsSender(db);
  }
})()
