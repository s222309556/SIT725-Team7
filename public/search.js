var userId;
var whishListBookIds = [];
var allbooks = [];
document.addEventListener("DOMContentLoaded", function () {
  // Fetch and display the list of books
  checkSession();
  getWishList();
  fetchBooks();
  handleSearch();
});

//check session is set
function checkSession() {
  userId = sessionStorage.getItem("userId");
  if (!userId) {
    // Session is set, user is logged in
    // Redirect to the addBook.html page
    window.location.href = "/login.html";
    return false;
  }
}

// Function to fetch the list of books
async function fetchBooks() {
  try {
    const response = await fetch("/books");
    const data = await response.json();

    if (data.success) {
      allbooks = data.data;
      //call showBooks function
      populateBooks(allbooks);
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
}

//showBooks function
function populateBooks(books) {
  // Get the container element where the books will be appended
  const container = document.getElementById("bookContainer");

  // Iterate over the books array
  books.forEach((book) => {
    // Create the main container for each book

    const bookContainer = document.createElement("div");
    bookContainer.setAttribute("name", "bookElement");
    bookContainer.style.cssText =
      "float: left; width: 300px; height: 400px; background-color: #f0f0f0; border-radius: 10px; margin: 20px; padding: 20px; box-sizing: border-box; display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3)";

    // Create the book cover element
    const bookCover = document.createElement("div");
    bookCover.style.cssText =
      "width: 100%; height: 200px; background-color: #ddd; border-radius: 5px; margin-bottom: 10px; background-image: url('images/noBook.jpg'); background-position-x: center; background-position-y: center; background-size: cover; cursor: pointer;";
    bookContainer.appendChild(bookCover);

    // Create the book information section
    const bookInfo = document.createElement("div");
    const titleElement = document.createElement("h2");
    const authorElement = document.createElement("p");
    const ownerElement = document.createElement("p");
    const buttonElement = document.createElement("button");
    buttonElement.setAttribute("buttonData-id", book._id);

    titleElement.innerText = book.bookTitle;
    titleElement.style.cssText =
      "font-size: 1.2rem; font-weight: bold; margin-bottom: 10px;";

    authorElement.innerText = book.authorName;
    authorElement.style.cssText =
      "font-size: 1rem; color: #777; margin-bottom: 10px;";

    ownerElement.innerText = "Owned by " + book.userName;
    ownerElement.style.cssText = "font-size: 0.9rem; color: #777;";

    //check if book is in wish list
    if (whishListBookIds.includes(book._id)) {
      buttonElement.innerText = "Remove from Wish List";
      buttonElement.style.cssText =
        "width: 100%; padding: 10px; border: none; border-radius: 5px; background-color: rgb(225 225 225); color: #333; font-size: 1rem; font-weight: bold; cursor: pointer;";
      buttonElement.addEventListener("click", function () {
        // Remove book from wish list
        removeFromWishList(book._id);
      });
    } else {
      buttonElement.innerText = "Add to Wish List";
      buttonElement.style.cssText =
        "width: 100%; padding: 10px; border: none; border-radius: 5px; background-color: rgb(225 225 225); color: #333; font-size: 1rem; font-weight: bold; cursor: pointer;";
      buttonElement.addEventListener("click", function () {
        // Add book to wish list
        addToWishList(book._id);
      });
    }

    bookInfo.appendChild(titleElement);
    bookInfo.appendChild(authorElement);
    bookInfo.appendChild(ownerElement);
    bookInfo.appendChild(buttonElement);
    bookContainer.appendChild(bookInfo);

    //add click event listener to bookContainer
    bookCover.addEventListener("click", function () {
      // Redirect to the book details page
      window.location.href = `/bookDetails.html?id=${book._id}`;
    });

    // Append the book container to the main container
    container.appendChild(bookContainer);
  });
}

// function to clear book list
function clearBookList() {
  const bookList = document.getElementById("bookContainer");
  bookList.innerHTML = "";
}

//search books
async function handleSearch() {
  document
    .getElementById("searchFromBtn")
    .addEventListener("click", function () {
      console.log("searching");
      // e.preventDefault();
      const srchTitle = document.getElementById("srchTitle").value;
      const srchAuthor = document.getElementById("srchAuthor").value;
      const srchGenre = document.getElementById("srchGenre").value;
      const srchIsbn = document.getElementById("srchIsbn").value;
      const srchLanguage = document.getElementById("srchLanguage").value;

      let reqBody = {
        bookTitle: srchTitle,
        authorName: srchAuthor,
        bookGenre: srchGenre,
        bookIsbn: srchIsbn,
        language: srchLanguage,
      };
      console.log(reqBody);
      searchBooks(reqBody);
    });
}

async function searchBooks(reqBody) {
  try {
    fetch(`/books/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqBody),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.success) {
          clearBookList();
          if (res.data.length > 0) {
            populateBooks(res.data);
          } else {
            const container = document.getElementById("bookContainer");
            const noBook = document.createElement("h2");
            noBook.innerText = "No books found";
            container.appendChild(noBook);
          }
        } else {
          console.error(res.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    console.error(error.message);
  }
}

function addToWishList(bookId) {
  fetch(`/users/${userId}/addBook/${bookId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      if (res.success) {
        alert("Book added to wish list");
        document.querySelector(
          'button[buttonData-id="' + bookId + '"]'
        ).innerText = "Remove from Wish List";
        getWishList();
      } else {
        console.error(res.message);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

function removeFromWishList(bookId) {
  fetch(`/users/${userId}/removeBook/${bookId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      if (res.success) {
        alert("Book removed from wish list");
        document.querySelector(
          'button[buttonData-id="' + bookId + '"]'
        ).innerText = "Add to Wish List";
        getWishList();
        getWishList();
      } else {
        console.error(res.message);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

function getWishList() {
  fetch(`/users/${userId}`)
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      if (res.success) {
        whishListBookIds = res.data.bookWishList;

        fetch(`/books/getBooksByIds`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ bookIds: whishListBookIds }),
        })
          .then((res) => res.json())
          .then((res) => {
            console.log(res);
            if (res.success) {
              clearWishList();
              populateWishList(res.data);
            } else {
              console.error(res.message);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        console.error(res.message);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

function clearWishList() {
  const wishListBookContainer = document.getElementById("wishlistContainer");
  wishListBookContainer.innerHTML = "";
}

function populateWishList(data) {
  const wishListBookContainer = document.getElementById("wishlistContainer");
  data.forEach((book) => {
    const bookContainer = document.createElement("div");
    bookContainer.addEventListener("click", function () {
      // Redirect to the book details page
      window.location.href = `/bookDetails.html?id=${book._id}`;
    });
    bookContainer.style.cssText =
      "cursor:pointer;background-color: #f0f0f0; padding: 20px; margin-right: 20px; margin-bottom: 20px; border-radius: 5px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);";
    const bookTitle = document.createElement("h2");
    bookTitle.innerText = book.bookTitle;
    bookTitle.style.cssText =
      "font-size: 1.2rem; font-weight: bold; margin-bottom: 10px;";
    const bookAuthor = document.createElement("p");
    bookAuthor.innerText = book.authorName;
    bookAuthor.style.cssText =
      "font-size: 1rem; color: #777; margin-bottom: 10px;";
    const bookOwner = document.createElement("p");
    bookOwner.innerText = "Owned by " + book.userName;
    bookOwner.style.cssText = "font-size: 0.9rem; color: #777;";

    //append
    bookContainer.appendChild(bookTitle);
    bookContainer.appendChild(bookAuthor);
    bookContainer.appendChild(bookOwner);
    wishListBookContainer.appendChild(bookContainer);
  });
}
