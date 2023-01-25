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

chrome.identity.getAuthToken({ 'interactive': true }, function(token) {
  if (chrome.runtime.lastError) {
    console.log(chrome.runtime.lastError);
    return;
  }
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=' + token);
  xhr.onload = function() {
    var userInfo = JSON.parse(xhr.responseText);
    console.log(userInfo.email);
  };
  xhr.send();
	console.log("token",token)
});