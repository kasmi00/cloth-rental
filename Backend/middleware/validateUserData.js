const validator = require('validator');

const validateUserData = (req, res, next) => {
  console.log("middleware")
    const { name, email, phone, password } = req.body;
    console.log(password)
    
    // Validate name (letters and spaces only)
    if (!validator.isAlpha(name.replace(/\s/g, ''))) {
      return res.status(400).json({ msg: "Invalid name format" });
      
    }
    console.log(name)
    // Validate email
    if (!validator.isEmail(email)) {
      return res.status(400).json({ msg: "Invalid email format" });
    }
    console.log(email)
  
    // Validate phone number (using a basic regex for digits and optional dashes)
    if (!validator.isMobilePhone(phone, 'any', { strictMode: false })) {
      return res.status(400).json({ msg: "Invalid phone format" });
    }
    console.log(phone)
    // You can add more complex password validation here
    if (password.length < 8) {
      return res.status(400).json({ msg: "Password should be at least 8 characters long" });
    }
   console.log(password)
    req.validatedUserData = { name, email, phone, password };
    console.log("last")
    next();
  };
module.exports =validateUserData;  