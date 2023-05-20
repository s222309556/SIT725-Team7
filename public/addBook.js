// Check if the session is set (user is already logged in)
window.addEventListener("DOMContentLoaded", function () {
  const userId = sessionStorage.getItem("userId");
  if (!userId) {
    // Session is set, user is logged in
    // Redirect to the addBook.html page
    window.location.href = "/login.html";
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const addBookForm = document.getElementById("addBookForm");

  addBookForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const bookName = document.getElementById("bookName").value;
    const authorName = document.getElementById("authorName").value;
    const bookDescription = document.getElementById("bookDescription").value;
    const bookIsbn = document.getElementById("bookIsbn").value;
    const bookGenre = document.getElementById("bookGenre").value;
    console.log(
      'sessionStorage.getItem("userId")',
      sessionStorage.getItem("userId")
    );
    const bookData = {
      bookName: bookName,
      authorName: authorName,
      bookDescription: bookDescription,
      bookIsbn: bookIsbn,
      bookGenre: bookGenre,
      userId: sessionStorage.getItem("userId"),
    };

    // Perform an AJAX request to send the book data to the server
    fetch("/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // Book added successfully, redirect to a success page or perform any other action
          alert("Book added successfully!");
          window.location.href = "/home.html"; // Redirect to success page
        } else {
          console.error(data.message);
          // Error occurred while adding the book, handle the error or display an error message
          alert("Error occurred while adding the book. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred. Please try again.");
      });
  });
});
