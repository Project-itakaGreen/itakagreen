export function dbConnection(): Promise<IDBDatabase | any> {
  return new Promise((resolve, reject) => {
    const DBOpenRequest = indexedDB.open("records", 10);
    DBOpenRequest.onerror = () => {
      console.error("error opening db");
      reject();
    };

    DBOpenRequest.onupgradeneeded = setupDB;
    DBOpenRequest.onsuccess = (event: Event) => {
      resolve(DBOpenRequest.result as IDBDatabase);
    };
  });
}

/**
 * Setup the database on 'onupgradeneeded' event
 */
function setupDB(event: any): void {
  const db = event.target.result as IDBDatabase;
  if (db.objectStoreNames.contains("records")) {
    db.deleteObjectStore("records");
  }
  const objectStore = db.createObjectStore("records", {
    keyPath: "id",
    autoIncrement: true,
  });
  objectStore.createIndex("key", ["domainName", "timeInterval"], {
    unique: true,
  });
  objectStore.createIndex("domainName", "domainName", {
    unique: false,
  });
  objectStore.createIndex("timeInterval", "timeInterval", {
    unique: false,
  });
  objectStore.createIndex("bytes", "bytes", {
    unique: false,
  });
}
