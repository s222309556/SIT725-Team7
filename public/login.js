document
  .getElementById("loginForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const response = await fetch("/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (data.success) {
      alert("Login successful!");
      // Store the userId in session storage
      sessionStorage.setItem("userId", data.data.userId);

      // Redirect to the addBook.html page
      window.location.href = "/home.html";
      // Redirect to the desired page after successful login
      // For example: window.location.href = "/dashboard.html";
    } else {
      alert(data.message);
    }
  });

// Check if the session is set (user is already logged in)
window.addEventListener("DOMContentLoaded", function () {
  const userId = sessionStorage.getItem("userId");
  if (userId) {
    // Session is set, user is logged in
    window.location.href = "/home.html";
  }
});
