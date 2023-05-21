window.addEventListener("DOMContentLoaded", function () {
  const userId = sessionStorage.getItem("userId");
  if (!userId) {
    // Session is set, user is logged in
    // Redirect to the addBook.html page
    window.location.href = "/login.html";
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
});
