import type { DomainI } from "../interfaces/DomainI";

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
  } else if (domain.renewable === true) {
    console.log("this domain use renewable energie");
  } else {
    console.log("this domain use non renewable energie");
  }
}
chrome.runtime.onMessage.addListener(function (request) {
  if (request.message === "response") {
    handleDomain(request.value);
  }
});
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

      // chrome.runtime.sendMessage({ message: "domain" });
     

      // if(!db){
      //   chrome.runtime.sendMessage(
      //     { type: "getDb" },
      //     function (response) {
      //       let getDb= response
      //       console.log("yayy",getDb)
      //       // db = getDb;
      //     }
      //   );
      // }

      // Get actual domain name
      // chrome.runtime.sendMessage(
      //   { type: "getActiveSiteDomain" },
      //   async function (response) {
      //     activeSiteDomain = response.activeSiteDomain;
      //     console.log("domain:", activeSiteDomain);
      //     console.log("a");
      //     // Test if innoDb loaded
      //     if (db instanceof IDBDatabase) {
      //       //Get
      //       console.log("b");
      //       const transaction = db.transaction(["records"], "readwrite");
      //       const objectStore = transaction.objectStore("records");
      //       const currentInterval = getTimeIntervalStart();
      //       const index = objectStore.index("key");
      //       const request = index.get([activeSiteDomain, currentInterval]);

      //       request.onsuccess = function (event: Event) {
      //         const record = request.result;
      //         const sizeBytes: string = record.bytes || "0";
      //         document.getElementById("conso-site").innerText = sizeBytes;
      //       };
      //     }
      //   }
      // );
    }
  }
);

// // if new size if second popup  already open
// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   if (request.type === "sendNewRecordSize") {
//     const sizeBytes: string = request.data || "0";
//     document.getElementById("conso-site").innerHTML = sizeBytes;
//   }
// });

// chrome.runtime.sendMessage({ type: "getDb" }, function (response) {
//   let getDb = response;
//   console.log("yayy", getDb);
//   // db = getDb;
// });