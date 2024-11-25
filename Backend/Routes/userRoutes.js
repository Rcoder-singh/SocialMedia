const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
} = require("../Controllers/userController");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/update/:_id", updateUser);
router.delete("/delete/:_id", deleteUser);

module.exports = router;
