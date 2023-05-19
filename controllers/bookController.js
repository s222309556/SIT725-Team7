// controllers/bookController.js
const books = [
  {
    id: 1,
    name: "Harry Potter",
    isbn: "123456ASB",
    description:
      "Aenean id ullamcorper libero. Vestibulum imperdiet nibh. Lorem ullamcorper volutpat. Vestibulum lacinia risus.",
    author: "J.K Rowling",
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
const getBooks = (req, res) => {
  // Logic to fetch users from the database
  // For now, let's send a sample response
  res.json(books);
};

// GET /users
const getBookbyId = (req, res) => {
  const bookId = req.params.id;
  let book = books.find((item) => item.id == bookId);
  res.json(book);
};

module.exports = {
  getBooks,
  getBookbyId,
};
