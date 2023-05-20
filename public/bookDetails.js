document.addEventListener("DOMContentLoaded", function () {
  const bookDetailsContainer = document.getElementById("bookDetails");

  // Function to fetch the book details by ID
  const fetchBookDetails = async () => {
    try {
      // Get the book ID from the URL query parameter
      const urlParams = new URLSearchParams(window.location.search);
      const bookId = urlParams.get("id");

      if (!bookId) {
        console.error("Book ID is missing in the URL.");
        return;
      }

      const response = await fetch(`/books/${bookId}`);
      const data = await response.json();

      if (data.success) {
        const book = data.data;

        // Generate the book details HTML
        const bookDetailsHTML = `
            <h2>${book.bookName}</h2>
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

  // Fetch and display the book details
  fetchBookDetails();
});
