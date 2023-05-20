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

// Define routes for books

// Define routes for users
app.get("/users", userController.getUsers);
app.get("/users/:id", userController.getUserById);
app.post("/users", userController.createUser);
app.put("/users/:id", userController.updateUser);
app.delete("/users/:id", userController.deleteUser);
app.post("/users/login", userController.loginUser);
app.post("/users/register", userController.registerUser);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
