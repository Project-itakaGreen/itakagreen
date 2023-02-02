import type { DomainI } from "../interfaces/DomainI";
// ---------------- POPUP INTERACT ----------------
const loginButton = document.getElementById("google-login-button");

loginButton.addEventListener("click", handleLogin);
function handleLogin() {
  console.log("login");
  window.open(process.env.API_URL + "/auth/google/login", "_blank");
}

chrome.runtime.sendMessage({ message: "domain" });
chrome.runtime.onMessage.addListener(function (request) {
  if (request.message === "response") {
    handleDomain(request.value);
  }
});

function handleDomain(domain: DomainI | false) {
  if (domain === false) {
    console.log("domain invalid"); // ex: chrome pages
  } else if (domain.renewable === true) {
    console.log("this domain use renewable energie");
  } else {
    console.log("this domain use non renewable energie");
  }
}
