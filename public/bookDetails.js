// Check if the session is set (user is already logged in)
var bookId;
var bookOwnerId;
var bookTitle;

window.addEventListener("DOMContentLoaded", function () {
  const userId = sessionStorage.getItem("userId");
  if (!userId) {
    // Session is set, user is logged in
    // Redirect to the addBook.html page
    // window.location.href = "/login.html";
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const bookDetailsContainer = document.getElementById("bookDetails");

  // Function to fetch the book details by ID
  const fetchBookDetails = async () => {
    try {
      // Get the book ID from the URL query parameter
      const urlParams = new URLSearchParams(window.location.search);
      bookId = urlParams.get("id");

      if (!bookId) {
        console.error("Book ID is missing in the URL.");
        return;
      }

      const response = await fetch(`/books/${bookId}`);
      const data = await response.json();

      if (data.success) {
        const book = data.data;
        bookOwnerId = book.userId;
        bookTitle = book.bookTitle;
        // Generate the book details HTML
        const bookDetailsHTML = `
            <h2>${bookTitle}</h2>
            <p>Author: ${book.authorName}</p>
            <p>Description: ${book.bookDescription}</p>
            <p>ISBN: ${book.bookIsbn}</p>
            <p>Genre: ${book.bookGenre}</p>
          `;

        // Display the book details
        bookDetailsContainer.innerHTML = bookDetailsHTML;
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  //create an order when clicked createOrderBtn
  // script.js
  document
    .getElementById("createOrderBtn")
    .addEventListener("click", async function () {
      try {
        const response = await fetch("/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            orderName: "Order for " + bookTitle,
            bookId: bookId,
            buyerId: sessionStorage.getItem("userId"),
            sellerId: bookOwnerId,
            status: "Pending",
            // Add any other required order properties
          }),
        });

        const data = await response.json();
        if (data.success) {
          alert("Order created successfully!");
          // Redirect or perform any other action after order creation
          // For example: window.location.href = "/home.html";
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while creating the order.");
      }
    });

  // Fetch and display the book details
  fetchBookDetails();
});
