const express = require("express");
const {
  regisUser,
  authUser,
  allusers,
} = require("../controller/userController");

const auth = require("../auth");
const router = express.Router();

router.route("/").post(regisUser);
router.post("/login", authUser);
router.route("/").get(auth, allusers);
module.exports = router;
