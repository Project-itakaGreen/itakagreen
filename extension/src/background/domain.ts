/**
 * Wath if the popup send a request to have domain's informations
 */
export function loadInfoDomain(): void {
  chrome.runtime.onMessage.addListener(async function (
    request,
    sender,
    sendResponse
  ) {
    if (request.message === "domain") {
      const r = retrieveInfoDomain();
      r.then((res) => {
        sendResponse(r);
      });
    }
  });
}

/**
 * Get the domain of the open tab with the protocole
 */
function getDomain(): Promise<unknown> {
  // get current tab
  const p = new Promise((resolve, reject) => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      // get domain of the tab
      const domain = new URL(tabs[0].url).origin;
      resolve(domain);
    });
  });
  return p;
}

/**
 * Call the api to get the domain's informations
 */
async function fetchDomainInfos(domain: string) {
  // fetch domain infos
  return await fetch(`http://localhost:8080/api/domain/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ domain: domain }),
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
}

/**
 * Return a pomise with the domain's information
 */
function retrieveInfoDomain(): Promise<unknown> {
  const p = new Promise(async (resolve, reject) => {
    const domain = await getDomain();
    if (typeof domain === "string" && domain.length > 0) {
      const infos = fetchDomainInfos(domain);
      resolve(infos);
    }
  });
  return p;
}
