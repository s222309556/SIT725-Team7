//Controlller for Book
const Book = require("../models/Book");

// @desc    Get all books
// @route   GET /books
// @access  Public
exports.getBooks = async (req, res, next) => {
  try {
    //where isActive == true
    const books = await Book.find({ isActive: true });
    res.status(200).json({ success: true, data: books });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

//@desc     search books by params
//@route    POST /books/search
//@access   Public
exports.searchBooks = async (req, res, next) => {
  try {
    const { bookTitle, authorName, bookIsbn, bookGenre } = req.body;
    let query = {};
    query.isActive = true;
    if (bookTitle) {
      query.bookTitle = { $regex: new RegExp(bookTitle, "i") };
    }
    if (authorName) {
      query.authorName = { $regex: new RegExp(authorName, "i") };
    }
    if (bookIsbn) {
      query.bookIsbn = { $regex: new RegExp(bookIsbn, "i") };
    }
    if (bookGenre) {
      query.bookGenre = { $regex: new RegExp(bookGenre, "i") };
    }
    const books = await Book.find(query);
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
// exports.searchBooks = async (req, res, next) => {
//   try {
//     const query = req.params.query;
//     const books = await Book.find({ $text: { $search: query } });
//     res.status(200).json({ success: true, data: books });
//   } catch (error) {
//     res.status(400).json({ success: false, message: error.message });
//   }
// };

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

// @desc    Update book
// @route   PUT /books/:id
// @access  Public
exports.updateBook = async (req, res, next) => {
  try {
    const updateBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updateBook) {
      return res
        .status(400)
        .json({ success: false, message: "Book not found" });
    }
    res.status(200).json({ success: true, data: updateBook });
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

// @desc    Add review to book
// @route   PUT /books/:id/review
// @access  Public
exports.addReview = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res
        .status(400)
        .json({ success: false, message: "Book not found" });
    }
    const { userId, review, userName } = req.body;
    const newReview = { userId, review, userName };
    book.bookReviews.push(newReview);
    await book.save();
    res.status(200).json({ success: true, data: book });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Delete review from book
// @route   DELETE /books/:id/review/:reviewId
// @access  Public
exports.deleteReview = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res
        .status(400)
        .json({ success: false, message: "Book not found" });
    }
    const review = book.bookReviews.find(
      (review) => review._id.toString() === req.params.reviewId
    );
    if (!review) {
      return res
        .status(400)
        .json({ success: false, message: "Review not found" });
    }
    const removeIndex = book.bookReviews
      .map((review) => review._id.toString())
      .indexOf(req.params.reviewId);
    book.bookReviews.splice(removeIndex, 1);
    await book.save();
    res.status(200).json({ success: true, data: book });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
