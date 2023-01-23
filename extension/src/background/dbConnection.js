export function dbConnection() {
	return new Promise((resolve, reject) => {
		let db;

		const DBOpenRequest = indexedDB.open("records", 10);
		DBOpenRequest.onerror = function (event) {
			console.error("error opening db");
			reject();
		};

		DBOpenRequest.onupgradeneeded = setupDB;
		DBOpenRequest.onsuccess = function (event) {
			db = event.target.result;
			resolve(db);
		};
	})
}

/**
 * Setup the database on 'onupgradeneeded' event
 */
function setupDB(event) {
	const db = event.target.result;
	if (db.objectStoreNames.contains("records")) {
		db.deleteObjectStore("records");
	}
	const objectStore = db.createObjectStore("records", {
		keyPath: "id",
		autoIncrement: true
	});
	objectStore.createIndex("key", ["domainName", "timeInterval"], {
		unique: true
	});
	objectStore.createIndex("domainName", "domainName", {
		unique: false
	});
	objectStore.createIndex("timeInterval", "timeInterval", {
		unique: false
	});
	objectStore.createIndex("bytes", "bytes", {
		unique: false
	});
}