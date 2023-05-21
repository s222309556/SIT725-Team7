document
  .getElementById("registerForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const gender = document.getElementById("gender").value;
    const country = document.getElementById("country").value;
    const address = document.getElementById("address").value;
    const phone = document.getElementById("phone").value;

    const response = await fetch("/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        gender,
        country,
        address,
        phone,
      }),
    });

    const res = await response.json();
    if (res.success) {
      alert("Registration successful!");
      // Store the userId in session storage
      sessionStorage.setItem("userId", res.data._id);

      // Redirect to the addBook.html page
      window.location.href = "/home.html";
    } else {
      alert(res.message);
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
