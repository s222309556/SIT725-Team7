document.addEventListener("DOMContentLoaded", function () {
  const bookList = document.getElementById("bookList");

  // Function to fetch the list of books
  const fetchBooks = async () => {
    try {
      const response = await fetch("/books");
      const data = await response.json();

      if (data.success) {
        const books = data.data;

        // Generate the book list HTML
        const bookListHTML = books
          .map((book) => {
            return `<li><a href="/bookDetails.html?id=${book._id}">${book.bookTitle}</a></li>`;
          })
          .join("");

        // Display the book list
        bookList.innerHTML = bookListHTML;
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch and display the list of books
  fetchBooks();
});
