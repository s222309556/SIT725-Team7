const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const db = require("./db");

db();
app.use(express.static(__dirname + "/public"));

// Use body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Require the bookController and userController
const bookController = require("./controllers/bookController");
const userController = require("./controllers/UserController");
const messageController = require("./controllers/messageController");
const orderController = require("./controllers/orderController");

// Define routes for books
app.get("/books", bookController.getBooks);
app.get("/books/:id", bookController.getBookById);
app.get("/books/search/:query", bookController.searchBooks);
app.get("/books/user/:id", bookController.getBooksByUserId);
app.post("/books", bookController.createBook);
app.delete("/books/:id", bookController.deleteBook);

// Define routes for users
app.get("/users", userController.getUsers);
app.get("/users/:id", userController.getUserById);
app.post("/users", userController.createUser);
app.put("/users/:id", userController.updateUser);
app.delete("/users/:id", userController.deleteUser);
app.post("/users/login", userController.loginUser);
app.post("/users/register", userController.registerUser);

// Define routes for orders
app.post("/orders", orderController.createOrder);
app.get("/orders", orderController.getOrders);
app.get("/orders/:id", orderController.getOrderById);
app.get("/orders/buyerId/:id", orderController.getOrdersByBuyerId);
app.get("/orders/sellerId/:id", orderController.getOrdersBySellerId);

// Define routes for messages
app.get("/messages/sender/:id", messageController.getMessageBySenderId);
app.get("/messages/receiver/:id", messageController.getMessageByReceiverId);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
