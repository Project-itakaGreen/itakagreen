import type { DomainI } from "../interfaces/DomainI";

let actualDomain: any = null;
const bytesToGO = 1_073_741_824;
// ---------------- POPUP INTERACT ---------------- //
// Google connection

const loginButton = document.getElementById("google-login-button");
if (loginButton) {
  loginButton.addEventListener("click", () => {
    window.open(process.env.API_URL + "/auth/google/login", "_blank");
  });
}

function handleDomain(domain: DomainI | false) {
  if (domain === false) {
    console.log("domain invalid"); // ex: chrome pages
    actualDomain = null;
    return;
  } else if (domain.renewable === true) {
    console.log("this domain use renewable energie");
  } else {
    console.log("this domain use non renewable energie");
  }
  actualDomain = domain;
}

// Get cookie + load second popup if token exist
chrome.cookies.get(
  { url: process.env.FRONT_URL, name: "auth2" },
  //cookie.value = token
  async function (cookie) {
    if (cookie) {
      // Load Connected Popup
      const xhr = new XMLHttpRequest();
      xhr.open("GET", "./popup-connected.html", true);
      xhr.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
          document.body.innerHTML = this.responseText;
        }
      };
      xhr.send();
      try {chrome.runtime.sendMessage({ message: "getDomain" }).then(()=>{
        chrome.runtime.sendMessage({ message: "getPageConso" })
      })} catch (e){}
      
    }
  }
);


chrome.runtime.onMessage.addListener(function (request) {
  if (request.message === "sendDomain") {
    handleDomain(request.value);
  }
});

// if new size if second popup  already open
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === "updatePageConso") {
    if (actualDomain) {
      console.log("request.data",request.data);
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        console.log("query",tabs)
        const activeTabId = tabs[0].id;
        const activePageData = request.data.find(
          (saveTab: any) => saveTab.tabId === activeTabId
        );
        console.log(activePageData);
        const consoCo2 =
          Math.floor(
            ((activePageData.totalConsoBytes * actualDomain.co2PerGO) /
              bytesToGO) *
              100
          ) / 100;
        document.getElementById("conso-site-co2").innerText = String(consoCo2);
      });
    }

    // if (actualDomain) {
    //   const updatePageConsoBytes = request.data.bytes || 0;
    //   const consoCo2 = Math.floor(
    //     ((updatePageConsoBytes * actualDomain.co2PerGO) / bytesToGO) * 100
    //   ) / 100
    //   document.getElementById("conso-site-co2").innerText = String(consoCo2);
    // }
  }
});
