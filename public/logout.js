// Logout functionality
document.addEventListener("DOMContentLoaded", function () {
  const logoutButton = document.getElementById("logoutButton");

  logoutButton.addEventListener("click", function () {
    // Clear the session storage
    sessionStorage.clear();

    // Redirect to the login.html page
    window.location.href = "/login.html";
  });
});
