import type { DomainI } from "../interfaces/DomainI";

let db: IDBDatabase;

/**
 * Watch if the popup send a request to have domain's informations
 */
export function loadInfoDomain(dbConnection: IDBDatabase): void {
  db = dbConnection;
  chrome.runtime.onMessage.addListener(async function (request) {
    if (request.message === "domain") {
      const response = await retrieveInfoDomain();
      chrome.runtime.sendMessage({ message: "response", value: response });
    }
  });
}

/**
 * Return a pomise with the domain's informations
 */
async function retrieveInfoDomain(): Promise<DomainI | false> {
  const domain = await getDomain();
  if (typeof domain === "string" && domain.length > 0) {
    return await getDomainInfos(domain);
  }
  return false;
}

/**
 * Get the domain of the open tab with the protocole
 */
function getDomain(): Promise<string> {
  // get current tab
  const p = new Promise<string>((resolve, reject) => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      // get domain of the tab
      const domain = new URL(tabs[0].url).origin;
      resolve(domain);
    });
  });
  return p;
}

/**
 * Get the information of a domain and handle a local cache
 */
async function getDomainInfos(domain: string): Promise<DomainI | false> {
  const domainInfos = await getDomainFromDB(domain);
  if (domainInfos) {
    console.log("domainInfos found in local");
    return domainInfos;
  }
  console.log("domainInfos not found in local");
  const infos = await fetchDomainInfos(domain);
  if (infos !== false) {
    setDomainInDB(domain, infos);
  }

  return infos;
}

/**
 * Get domains from indexedDB
 */
async function getDomainFromDB(domainName: string): Promise<DomainI | false> {
  const p = new Promise<DomainI | false>((resolve, reject) => {
    const transaction = db.transaction(["domains"], "readonly");
    const objectStore = transaction.objectStore("domains");
    const index = objectStore.index("domainName");
    const request = index.get(domainName);
    request.onsuccess = function (event: Event) {
      if (!request.result) {
        resolve(false);
      } else {
        const domain = JSON.parse(request.result.domainInformations);
        resolve(domain);
      }
    };
  });
  return p;
}

/**
 * Set domains in indexedDB
 */
async function setDomainInDB(
  domainName: string,
  domainInformations: object
): Promise<void> {
  const serializedDomainInformations = JSON.stringify(domainInformations);
  const p = new Promise<void>((resolve, reject) => {
    const transaction = db.transaction(["domains"], "readwrite");
    const objectStore = transaction.objectStore("domains");
    const request = objectStore.put({
      domainName: domainName,
      domainInformations: serializedDomainInformations,
    });
    request.onsuccess = function (event: Event) {
      console.log("domain infos saved in local");
      resolve();
    };
  });
  return p;
}

/**
 * Call the api to get the domain's informations
 */
async function fetchDomainInfos(domain: string): Promise<DomainI | false> {
  // fetch domain infos
  console.log("fetch domain infos");
  return await fetch(`http://localhost:8080/api/domain/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ domain: domain }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (/^[45]/.test(data.statusCode)) {
        return false;
      }
      return data;
    });
}
