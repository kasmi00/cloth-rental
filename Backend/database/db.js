const mongoose = require("mongoose");
const adminSeeder = require("../service/adminSeeder");
require("dotenv").config();
const mongoURI = process.env.MONGO_URI;

async function connectToMongo() {
  await mongoose
    .connect(mongoURI)
    .then(() => {
      console.log("Connected to Mongo Successfully");
      adminSeeder();
    })
    .catch((err) => console.log(err));
}

console.log("database");
module.exports = connectToMongo;