document
  .getElementById("registerForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const response = await fetch("/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();
    if (data.success) {
      alert("Registration successful!");
      // Store the userId in session storage
      sessionStorage.setItem("userId", data.data.userId);
      // Redirect to the addBook.html page
      window.location.href = "temp/addBook.html";
      // Redirect to the login page or any other desired page
      window.location.href = "temp/login.html";
    } else {
      alert(data.message);
    }
  });

// Check if the session is set (user is already logged in)
window.addEventListener("DOMContentLoaded", function () {
  const userId = sessionStorage.getItem("userId");
  if (userId) {
    // Session is set, user is logged in
    // Redirect to the addBook.html page
    window.location.href = "/home.html";
  }
});
