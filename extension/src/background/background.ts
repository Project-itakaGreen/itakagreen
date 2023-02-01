import { dbConnection } from './dbConnection';
import { saveNavigationData } from './saveNavigationData';
import { loadStatsSender } from './statsSender';

(async () => {
  const db = await dbConnection();
  if(db instanceof IDBDatabase) {
    saveNavigationData(db);
    loadStatsSender(db);
  }
})()

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (tab.url === 'chrome://newtab/' && changeInfo.status === 'complete') {
    chrome.tabs.update(tab.id, {
      url: process.env.FRONT_URL +'/search'
    });
  }
}); 
