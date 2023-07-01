const jwt = require("jsonwebtoken");
const User = require("./Models/umodel");
const AsyncHandler = require("express-async-handler");

const auth = AsyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, "rakshith");
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (err) {
      res.status(401);
      throw new Error("Not authorised!!!");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("No token!!!");
  }
});

module.exports = auth;
