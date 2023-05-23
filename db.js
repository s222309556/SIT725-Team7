const mongoose = require("mongoose");
const uri =
  "mongodb+srv://admin:admin@cluster0.3lflt16.mongodb.net/bookSwapDB?retryWrites=true&w=majority";

//method to connect to the database
const db = async () => {
  try {
    const con = await mongoose.connect(uri);
    console.log("Connected to the database - " + con.connection.host);
  } catch (error) {
    console.log(error);
  }
};

module.exports = db;