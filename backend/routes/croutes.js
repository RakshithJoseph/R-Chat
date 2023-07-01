const express = require("express");
const {
  opchat,
  fchats,
  createGroup,
  renameGroup,
  removeGroup,
  addGroup,
} = require("../controller/chatcontroller");
const auth = require("../auth");

const router = express.Router();

router.route("/").post(auth, opchat);
router.route("/").get(auth, fchats);
router.route("/group").post(auth, createGroup);
router.route("/rename").put(auth, renameGroup);
router.route("/gremove").put(auth, removeGroup);
router.route("/gadd").put(auth, addGroup);

module.exports = router;
