//Schema for Book
const mongoose = require("mongoose");

const BookSchema = mongoose.Schema({
  bookTitle: {
    type: String,
    required: true,
  },
  authorName: {
    type: String,
    required: true,
  },
  bookDescription: {
    type: String,
    required: true,
  },
  bookIsbn: {
    type: String,
    required: true,
  },
  bookGenre: {
    type: String,
    required: true,
  },
  fullText: {
    type: String,
    required: false,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
});

BookSchema.index({ fullText: "text" }); // Create an index on the fullText field for text search

// Middleware to populate the fullText field before saving
BookSchema.pre("save", function (next) {
  this.fullText = `${this.bookTitle} ${this.authorName} ${this.bookIsbn} ${this.bookGenre}`;
  next();
});

const Book = mongoose.model("Book", BookSchema);
module.exports = Book;
