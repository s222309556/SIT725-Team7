//Controlller for Book
const Book = require("../models/Book");

// @desc    Get all books
// @route   GET /books
// @access  Public
exports.getBooks = async (req, res, next) => {
  try {
    const books = await Book.find();
    res.status(200).json({ success: true, data: books });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Get book by id
// @route   GET /books/:id
// @access  Public
exports.getBookById = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res
        .status(400)
        .json({ success: false, message: "Book not found" });
    }
    res.status(200).json({ success: true, data: book });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Search books by full text
// @route   GET /books/search/:query
// @access  Public
exports.searchBooks = async (req, res, next) => {
  try {
    const query = req.params.query;
    const books = await Book.find({ $text: { $search: query } });
    res.status(200).json({ success: true, data: books });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Get all books by user id
// @route   GET /books/user/:id
// @access  Public
exports.getBooksByUserId = async (req, res, next) => {
  try {
    const books = await Book.find({ userId: req.params.id });
    if (!books) {
      return res
        .status(400)
        .json({ success: false, message: "Books not found" });
    }
    res.status(200).json({ success: true, data: books });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Create new book
// @route   POST /books
// @access  Public
exports.createBook = async (req, res, next) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json({ success: true, data: book });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Delete book
// @route   DELETE /books/:id
// @access  Public
exports.deleteBook = async (req, res, next) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return res
        .status(400)
        .json({ success: false, message: "Book not found" });
    }
    res.status(200).json({ success: true, data: book });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
