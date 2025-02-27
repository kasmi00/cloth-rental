const mongoose = require("mongoose");
const { Schema } = mongoose;
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: "https://static.thenounproject.com/png/12017-200.png",
  },
  role: {
    type: String,
    enum: ["customer", "admin"],
    default: "customer",
  },
  likedItems: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Post", default: [] },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
