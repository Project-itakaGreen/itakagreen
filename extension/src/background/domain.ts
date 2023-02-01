/**
 * Wath if the popup send a request to have domain's informations
 */
export async function loadInfoDomain() {
  chrome.runtime.onMessage.addListener(async function (request) {
    if (request.message === "domain") {
      const response = await retrieveInfoDomain();
      chrome.runtime.sendMessage({ message: "response", value: response });
    }
  });
}

/**
 * Return a pomise with the domain's information
 */
async function retrieveInfoDomain(): Promise<object | false> {
  const domain = await getDomain();
  if (typeof domain === "string" && domain.length > 0) {
    const infos = await fetchDomainInfos(domain);
    return infos;
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
 * Call the api to get the domain's informations
 */
async function fetchDomainInfos(domain: string): Promise<object> {
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
