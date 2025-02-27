const mongoose = require("mongoose");
const adminSeeder = require("../service/adminSeeder");
require("dotenv").config();
const mongoURI = process.env.URL;
async function connectToMongo() {
  await mongoose
    .connect(mongoURI, { useNewUrlParser: true })
    .then(() => console.log("Connected to Mongo Successfully"))
    .catch((err) => console.log(err));
}
console.log("database");
// admin seeding function
adminSeeder();

module.exports = connectToMongo;
