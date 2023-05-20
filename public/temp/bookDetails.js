// Function to retrieve the user ID from the query parameter
const getUserIdFromQueryParams = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  //return 1;
  return urlParams.get("id");
};

// Function to fetch users from the API and update the list
const getBookDetailsById = async () => {
  try {
    const bookId = getUserIdFromQueryParams();

    fetch(`/books/${bookId}`)
      .then((response) => response.json())
      .then((res) => {
        console.log(res.name); // Handle the book data as needed
        //Populate result in html
        document.getElementById("bookName").textContent = res.name;
        document.getElementById("bookDesc").textContent = res.description;
        document.getElementById("bookIsbn").textContent = res.isbn;
        document.getElementById("bookAuthor").textContent = res.author;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  } catch (error) {
    console.error("Error:", error);
  }
};

// Call the fetchUsers function when the page loads
window.addEventListener("load", getBookDetailsById);
