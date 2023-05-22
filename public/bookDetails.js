// Check if the session is set (user is already logged in)
var bookId;
var bookOwnerId;
var bookTitle;
var userId;

window.addEventListener("DOMContentLoaded", function () {
  checkSession();
  fetchBookDetails();
});

function checkSession() {
  userId = sessionStorage.getItem("userId");
  if (!userId) {
    // Session is set, user is logged in
    // Redirect to the addBook.html page
    // window.location.href = "/login.html";
  }
}

async function fetchBookDetails() {
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
      console.log(book);
      // Generate the book details HTML
      document.getElementById("bookTitle").innerText = book.bookTitle;
      document.getElementById("bookIsbn").innerText = book.bookIsbn;
      document.getElementById("bookAuthor").innerText = book.authorName;
      document.getElementById("description").innerText = book.bookDescription;
      document.getElementById("genre").innerText = book.bookGenre;

      if (userId == bookOwnerId) {
        document.getElementById("createOrderBtn").style.display = "none";
        document
          .getElementById("createOrderBtnWrapper")
          .appendChild(
            document.createTextNode("You are the owner of this book")
          );
      } else {
        checkOrder();
      }
    } else {
      console.error(data.message);
    }
  } catch (error) {
    console.error(error);
  }
}

async function checkOrder() {
  let params = {
    bookId: bookId,
    buyerId: userId,
  };
  console.log("params - ", params);
  try {
    const response = await fetch(`/orders/checkOrderExist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          document.getElementById("createOrderBtn").style.display = "none";
          document
            .getElementById("createOrderBtnWrapper")
            .appendChild(
              document.createTextNode("You have already ordered this book")
            );
        } else {
          handleButtonClick();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    console.error(error);
  }
}

function handleButtonClick() {
  document
    .getElementById("createOrderBtn")
    .addEventListener("click", async function () {
      try {
        fetch("/orders", {
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
          //refresh the page
          window.location.reload();
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

  // wishlist
  function changeHeartColor() {
    var heartIcon = document.getElementById("heartIcon");
    heartIcon.classList.toggle("far");
    heartIcon.classList.toggle("fas");
    heartIcon.classList.toggle("red");
  }
}
