// controllers/notoficationController.js
const notifications = [
  {
    id: 1,
    bookId: "1",
    senderId: "u1",
    recieverId: "u2",
  },
  {
    id: 2,
    name: "The Lord of the Rings",
    isbn: "123456PQR",
    description:
      "Aenean id ullamcorper libero. Vestibulum imperdiet nibh. Lorem ullamcorper volutpat. Vestibulum lacinia risus.Aenean id ullamcorper libero. Vestibulum imperdiet nibh. Lorem ullamcorper volutpat. Vestibulum lacinia risus.Aenean id ullamcorper libero. Vestibulum imperdiet nibh. Lorem ullamcorper volutpat. Vestibulum lacinia risus.",
    author: "J.R.R. Tolkein",
  },
];

// GET /users
const getNotifications = (req, res) => {
  // Logic to fetch users from the database
  // For now, let's send a sample response
  res.json(books);
};

// GET /users
const getBookbyId = (req, res) => {
  const bookId = req.params.id;
  console.log("bookId ", bookId);
  console.log("books - ", books);
  let book = books.find((item) => item.id == bookId);
  console.log("book ", book);
  res.json(book);
};

module.exports = {
  getBooks,
  getBookbyId,
};
