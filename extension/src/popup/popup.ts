// ---------------- POPUP INTERACT ----------------
const loginButton = document.getElementById("google-login-button");

loginButton.addEventListener("click", handleLogin);
function handleLogin() {
  console.log("login");
  window.open("http://localhost:8080/api/auth/google/login", "_blank");
}

chrome.runtime.sendMessage({ message: "domain" });
chrome.runtime.onMessage.addListener(function (request) {
  console.log("request", request);
});
