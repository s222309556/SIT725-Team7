const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
//const port = 3000;
//test code
const port = process.env.PORT || 3000; //port changed for heroku
const db = require("./db");

db();
app.use(express.static(__dirname + "/public"));
app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self' font-src 'self' data:;"
  );
  next();
});

// Use body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Require the bookController and userController
const bookController = require("./controllers/bookController");
const userController = require("./controllers/UserController");
const messageController = require("./controllers/messageController");
const orderController = require("./controllers/orderController");

// ... previous server code ...

io.on("connection", (socket) => {
  // Listen for chat messages from the client
  socket.on("chatMessage", async (messageObj) => {
    try {
      // Save the message to the database using the message controller
      const createdMessage = await messageController.createMessage({
        body: {
          senderId: messageObj.senderId,
          receiverId: messageObj.receiverId,
          message: messageObj.message,
          orderId: messageObj.orderId,
        },
      });
      // Emit the message to all connected clients
      io.emit("message", createdMessage);
    } catch (error) {
      console.error("Error saving message:", error.message);
    }
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

// ... remaining server code ...

// Define routes for books
app.get("/books", bookController.getBooks);
app.get("/books/:id", bookController.getBookById);
app.get("/books/user/:id", bookController.getBooksByUserId);
app.post("/books", bookController.createBook);
app.delete("/books/:id", bookController.deleteBook);
app.post("/books/search", bookController.searchBooks);
app.put("/books/:id/review", bookController.addReview);
app.put("/books/:id", bookController.updateBook);
app.post("/books/getBooksByIds", bookController.getBooksByIds);

// Define routes for users
app.get("/users", userController.getUsers);
app.get("/users/:id", userController.getUserById);
app.get("/topusers", userController.getTopUsers);
app.post("/users", userController.createUser);
app.put("/users/:id", userController.updateUser);
app.delete("/users/:id", userController.deleteUser);
app.post("/users/login", userController.loginUser);
app.post("/users/register", userController.registerUser);
app.put("/users/:id/addBook/:bookId", userController.addBook);
app.put("/users/:id/removeBook/:bookId", userController.removeBook);

// Define routes for orders
app.post("/orders", orderController.createOrder);
app.get("/orders", orderController.getOrders);
app.get("/orders/:id", orderController.getOrderById);
app.get("/orders/buyerId/:id", orderController.getOrdersByBuyerId);
app.get("/orders/sellerId/:id", orderController.getOrdersBySellerId);
app.post("/orders/checkOrderExist", orderController.checkOrderExist);
app.put("/orders/:id", orderController.updateOrder);

// Define routes for messages
app.post("/messages", messageController.createMessage);
app.get("/messages/sender/:id", messageController.getMessageBySenderId);
app.get("/messages/receiver/:id", messageController.getMessageByReceiverId);
app.post("/messages/messageHistory", messageController.messageHistory);

// Start the server
// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });

http.listen(port, () => {
  console.log(`listing on port ${port}`);
});
