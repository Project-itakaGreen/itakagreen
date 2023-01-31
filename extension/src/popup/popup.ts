// ---------------- POPUP INTERACT ---------------- //

// Google connection
const loginButton = document
  .getElementById("google-login-button")
  .addEventListener("click", handleLogin);
function handleLogin() {
  console.log("login");
  window.open(process.env.API_URL + "/auth/google/login", "_blank");
}

// Get cookie + load second popup if token exist
chrome.cookies.get(
  { url: process.env.FRONT_URL, name: "auth2" },
  function (cookie) {
    if (cookie) {
      console.log(cookie.value);
      // Load Connected Popup
      window.location.href = "./popup-connected.html";
    }
  }
);
