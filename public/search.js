document.addEventListener("DOMContentLoaded", function () {
  // Function to fetch the list of books
  const fetchBooks = async () => {
    try {
      const response = await fetch("/books");
      const data = await response.json();

      if (data.success) {
        const books = data.data;
        //call showBooks function
        populateBooks(books);
        // // Generate the book list HTML
        // const bookListHTML = books
        //   .map((book) => {
        //     return `<li><a href="/bookDetails.html?id=${book._id}">${book.bookTitle}</a></li>`;
        //   })
        //   .join("");

        // Display the book list
        //bookList.innerHTML = bookListHTML;
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

//showBooks function
function populateBooks(books) {
  // Get the container element where the books will be appended
  const container = document.getElementById("bookContainer");

  // Iterate over the books array
  books.forEach((book) => {
    // Create the main container for each book

    const bookContainer = document.createElement("div");
    bookContainer.style.cssText =
      "float: left; width: 300px; height: 400px; background-color: #f0f0f0; border-radius: 10px; margin: 20px; padding: 20px; box-sizing: border-box; display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3); cursor: pointer;";

    // Create the book cover element
    const bookCover = document.createElement("div");
    bookCover.style.cssText =
      "width: 100%; height: 200px; background-color: #ddd; border-radius: 5px; margin-bottom: 10px;";
    bookContainer.appendChild(bookCover);

    // Create the book information section
    const bookInfo = document.createElement("div");
    const titleElement = document.createElement("h2");
    const authorElement = document.createElement("p");
    const ownerElement = document.createElement("p");

    titleElement.innerText = book.bookTitle;
    titleElement.style.cssText =
      "font-size: 1.2rem; font-weight: bold; margin-bottom: 10px;";

    authorElement.innerText = book.authorName;
    authorElement.style.cssText =
      "font-size: 1rem; color: #777; margin-bottom: 10px;";

    ownerElement.innerText = "Owned by " + book.userName;
    ownerElement.style.cssText = "font-size: 0.9rem; color: #777;";

    bookInfo.appendChild(titleElement);
    bookInfo.appendChild(authorElement);
    bookInfo.appendChild(ownerElement);
    bookContainer.appendChild(bookInfo);

    //add click event listener to bookContainer
    bookContainer.addEventListener("click", function () {
      // Redirect to the book details page
      window.location.href = `/bookDetails.html?id=${book._id}`;
    });

    // Append the book container to the main container
    container.appendChild(bookContainer);
  });
}
