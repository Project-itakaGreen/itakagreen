// ---------------- POPUP INTERACT ----------------
const loginButton = document.getElementById("google-login-button");

loginButton.addEventListener("click", handleLogin);
function handleLogin() {
  console.log("login");
  window.open("http://localhost:8080/api/auth/google/login", "_blank");
}

// on popup open
chrome.runtime.sendMessage({ message: "domain" }, function (response) {
  console.log("year!");
  console.log(typeof response);
  response
    .then((res: any) => res.json())
    .then((data: any) => {
      console.log(data);
    });
});
