const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, "rakshith", {
    expiresIn: "20d",
  });
};

module.exports = generateToken;
