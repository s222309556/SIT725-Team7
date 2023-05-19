const express = require("express");
const app = express();
const port = 3000;
app.use(express.static(__dirname + "/public"));

// Require the userController
const bookController = require("./controllers/bookController");

// Define routes
app.get("/books", bookController.getBooks);
app.get("/books/:id", bookController.getBookbyId);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
