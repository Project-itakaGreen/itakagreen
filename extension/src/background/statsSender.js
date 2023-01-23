export async function loadStatsSender(db) {
	// todo remove the remove
	chrome.storage.local.remove('lastSynchronizationDate');
	logLastSynchronisation();
	const bool = await shouldSendStats();
	if (bool) {
		sendStats(db);
	}
}

async function sendStats(db) {
	const records = await getAllRecords(db);
	// todo use the conection
	const idUser = 2;
	const urlSendpoint = 'http://localhost:8080/api/record/many/' + idUser;
	fetch(urlSendpoint, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(records)
		})
		.then(function (response) {
			if (response.ok) {
				console.log("Stats sent");
				clearDb(db);
				updateLastStatsSend();
			} else {
				throw new Error('The backend send an error.');
			}
		})
		.catch(function (error) {
			console.warn("Error while sending stats: " + error);
		});
}

function getAllRecords(db) {
	const transaction = db.transaction(["records"], "readonly");
	const objectStore = transaction.objectStore("records");
	const promiseRecords = new Promise((resolve, reject) => {
		const request = objectStore.getAll();
		request.onsuccess = function (event) {
			resolve(event.target.result);
		}
		request.onerror = function (event) {
			console.error("Error while getting all records");
			reject(event.target.error);
		}
	})

	return promiseRecords;
}

/**
 * Delete all the records
 */
function clearDb(db) {
	const transaction = db.transaction(["records"], "readwrite");
	const objectStore = transaction.objectStore("records");
	const request = objectStore.clear();
	request.onsuccess = function (event) {
		console.log("DB cleared");
	}
}

/**
 * Update the date of the last synchronisation
 */
function updateLastStatsSend() {
	const date = new Date();
	date.setHours(0, 0, 0, 0);
	const dayInMs = date.getTime();
	chrome.storage.local.set({
		lastSynchronizationDate: dayInMs
	});
}

/**
 * Return if the data should be send as a boolean
 */
function shouldSendStats() {
	const date = new Date();
	date.setHours(0, 0, 0, 0);
	const dayInMs = date.getTime();

	return new Promise((resolve, reject) => {
		chrome.storage.local.get("lastSynchronizationDate", function (result) {
			resolve(result.lastSynchronizationDate != dayInMs);
		});
	})
}

/**
 * log the syncronisation to the server
 */
function logLastSynchronisation() {
	chrome.storage.local.get("lastSynchronizationDate", function (result) {
		if (!result.lastSynchronizationDate) {
			console.log('There are no synchronization registred in the logs');
		} else {
			const date = new Date(result.lastSynchronizationDate);
			console.log("lastSynchronizationDate from " + date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear());
		}
	});
}