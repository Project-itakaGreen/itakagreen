import type { DomainI } from "../interfaces/DomainI";

let actualDomain: any = null;
const bytesToGO = 1_073_741_824;
let totalCo2 = 0;
// ---------------- POPUP INTERACT ---------------- //
// Google connection

const loginButton = document.getElementById("google-login-button");

if (loginButton) {
  loginButton.addEventListener("click", () => {
    window.open(process.env.API_URL + "/auth/google/login", "_blank");
  });
}

function handleDomain(domain: DomainI | false) {
  const renewableSpan = document.getElementById("renewable-span");
  if (domain === false) {
    console.log("domain invalid"); // ex: chrome pages
    actualDomain = null;
    return;
  } else if (domain.renewable === true) {
    console.log("this domain use renewable energie");
    renewableSpan.innerText = "renouvelable";
  } else {
    console.log("this domain use non renewable energie");
    renewableSpan.innerText ="non renouvelable"
  }
  document.getElementById("renewable").innerText = "Ce site utilise de l'énergie ";
  
  actualDomain = domain;
}

async function fetchTotalCo2(token: string): Promise<any> {
  const urlAllConso = process.env.API_URL + "/conso/total/";
  return await fetch(urlAllConso, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  })
    .then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(JSON.stringify(response));
      }
    })
    .then(function (data) {
      return data.totalCo2;
    })
    .catch(function (error) {
      console.warn("Error while getting all conso: " + error);
      return 0;
    });
}

// Get cookie + load second popup if token exist
chrome.cookies.get(
  { url: process.env.FRONT_URL, name: "auth2" },
  async function (cookie) {
    const token = cookie?.value;
    if (token) {
      // Load Connected Popup
      const xhr = new XMLHttpRequest();
      xhr.open("GET", "./popup-connected.html", true);
      xhr.onreadystatechange = async function () {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
          document.body.innerHTML = this.responseText;
          const totalCo2 = await fetchTotalCo2(token);
          const totalConsoSpan = document.getElementById("conso-total-co2");
          if (totalConsoSpan) {
            totalConsoSpan.innerText = String(
              Math.floor(Number(totalCo2) * 100) / 100
            );
            const redirectDetailsBtn = document.getElementById("go-to-details")
            if (redirectDetailsBtn) {
              redirectDetailsBtn.addEventListener("click",()=>{
                window.open(process.env.FRONT_URL + "/details");
              })
            }
          }
        }
      };
      xhr.send();

      chrome.runtime
        .sendMessage({ message: "getDomain" })
        .then(() => {
          chrome.runtime.sendMessage({ message: "getPageConso" });
        })
        .catch(() => {}); 
    }
  }
);

chrome.runtime.onMessage.addListener(function (request) {
  if (request.message === "sendDomain") {
    handleDomain(request?.value);
  }
});

// if new size if second popup  already open
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === "updatePageConso") {
    if (actualDomain) {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const activeTabId = tabs[0].id;
        const activePageData = request.data.find(
          (saveTab: any) => saveTab.tabId === activeTabId
        );
        if (activePageData) {
          const consoCo2 =
            Math.floor(
              ((activePageData.totalConsoBytes * actualDomain.co2PerGO) /
                bytesToGO) *
                100
            ) / 100;
          if (consoCo2) {
            document.getElementById("conso-site-co2").innerText =
              String(consoCo2);
          }
        }
      });
    }
  }
});
