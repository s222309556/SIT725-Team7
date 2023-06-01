const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
  },
  country: {
    type: String,
  },
  address: {
    type: String,
  },
  phone: {
    type: String,
    required: true,
  },
  profileLevel: {
    type: String,
    enum: ["Gold", "Silver", "Bronze", "None"],
    default: "None",
  },
  redeemPoints: {
    type: Number,
    default: 0,
  },
  totalPoints: {
    type: Number,
    default: 0,
  },
  bookWishList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
    },
  ],
});

// Middleware to populate the userName field before saving
UserSchema.pre("save", function (next) {
  let emailId = this.email.split("@")[0];
  this.userName = `${emailId}`;
  next();
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
