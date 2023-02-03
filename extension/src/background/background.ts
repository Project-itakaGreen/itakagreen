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

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {   
  if (tab.url === 'chrome://newtab/' && changeInfo.status === 'complete') {     
    chrome.tabs.update(tab.id, {       
      url: process.env.FRONT_URL +'/search'     
    });   
  } 
}); 