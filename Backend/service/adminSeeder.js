const User = require("../models/User");
const bycrpt = require("bcrypt");
const adminSeeder = async () => {
  // whether admin exit or not
  console.log("seeder function called");
  const adminExist = await User.findOne({
    email: "admin@gmail.com",
    role: { $regex: /^admin$/i },
  });
  // admin seeding
  if (!adminExist) {
    console.log("admin doesn't exist");
    // if admin is not found then create new one
    await User.create({
      name: "admin",
      email: "admin@gmail.com",
      phone: "9999999999",
      password: await bycrpt.hash("admin", 10),
      role: "admin",
    });
    console.log("Admin seeded successfully");
  } else {
    console.log("Admin already seeded");
  }
};
module.exports = adminSeeder;
