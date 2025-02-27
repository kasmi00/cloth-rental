const jwt = require("jsonwebtoken");
const Token = require("../models/Token");
require("dotenv").config();

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    return res.status(401).json({ msg: "Token is missing" });
  }
  // console.log("token in backend✌️✌️", token);
  jwt.verify(token, process.env.ACCESS_SECRET_KEY, (error, user) => {
    if (error) {
      return res.status(403).json({
        msg: "invalid token",
      });
    }
    req.user = user;
    next();
  });
};

//   if (!refreshToken) {
//     return response.status(401).json({ msg: "Refresh token is missing" });
//   }

//   const token = await Token.findOne({ token: refreshToken });

//   if (!token) {
//     return response.status(404).json({ msg: "Refresh token is not valid" });
//   }

//   jwt.verify(token.token, process.env.REFRESH_SECRET_KEY, (error, user) => {
//     if (error) {
//       response.status(500).json({ msg: "invalid refresh token" });
//     }
//     const accessToken = jwt.sign(user, process.env.ACCESS_SECRET_KEY, {
//       expiresIn: "15m",
//     });

//     return response.status(200).json({ accessToken: accessToken });
//   });
// };
const createNewToken = async (request, response) => {
  // const refreshToken = request.body.token.split(" ")[1];
  const refreshToken = request.body
    ? request.body.token.split(" ")[1]
    : undefined;
  // console.log("Refresh Token:", refreshToken);

  if (!refreshToken) {
    return response.status(401).json({ msg: "Refresh token is missing" });
  }

  const token = await Token.findOne({ token: refreshToken });

  if (!token) {
    return response.status(404).json({ msg: "Refresh token is not valid" });
  }

  jwt.verify(token.token, process.env.REFRESH_SECRET_KEY, (error, user) => {
    if (error) {
      return response.status(500).json({ msg: "Invalid refresh token" });
    }

    const accessToken = jwt.sign(user, process.env.ACCESS_SECRET_KEY, {
      expiresIn: "1day",
    });

    return response.status(200).json({ accessToken: accessToken });
  });
};

module.exports = { authenticateToken, createNewToken };
