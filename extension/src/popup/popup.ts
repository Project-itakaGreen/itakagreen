// ---------------- POPUP INTERACT ----------------
const loginButton = document.getElementById("google-login-button");
console.log(loginButton)
loginButton.addEventListener("click", handleLogin);
function handleLogin() {
  console.log("login")
  // const loginUrl = 'http://localhost:8080/api/auth/google/login';
  // location.replace(loginUrl);
  window.open("http://localhost:8080/api/auth/google/login", "_blank");

  // chrome.identity.launchWebAuthFlow({
  //   url: 'https://accounts.google.com/o/oauth2/auth?response_type=code&client_id=<YOUR_CLIENT_ID>&redirect_uri=<YOUR_REDIRECT_URI>&scope=<YOUR_SCOPES>',
  //   interactive: true
  // }, function(redirect_url) {
  //   // Handle the redirect URL and extract the access token
  //   console.log(redirect_url)
  // });

}
