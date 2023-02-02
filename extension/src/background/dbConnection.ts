export function dbConnection(): Promise<IDBDatabase | any> {
  return new Promise((resolve, reject) => {
    const DBOpenRequest = indexedDB.open("records", 15);
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
  createObjectRecord(db);
  createObjectDomain(db);
}

/**
 * Create object records
 */
function createObjectRecord(db: IDBDatabase) {
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

/**
 * Create object domains
 */
function createObjectDomain(db: IDBDatabase) {
  if (db.objectStoreNames.contains("domains")) {
    db.deleteObjectStore("domains");
  }
  const objectStore = db.createObjectStore("domains", {
    keyPath: "id",
    autoIncrement: true,
  });
  objectStore.createIndex("domainName", "domainName", {
    unique: true,
  });
  objectStore.createIndex("informations", "informations", {
    unique: false,
  });
}
