const express = require("express");
const router = express.Router();
const CheckToken = require("../Middleware/CheckToken");
const {
  userInfo,
  loginUser,
  updateUser,
  deleteUser,
  registerUser,
} = require("../Controllers/userController");

router.post("/login", loginUser);
router.get("/get_user_info", CheckToken, userInfo);
router.post("/register", registerUser);
router.delete("/delete/:_id",CheckToken, deleteUser);
router.put("/update/:_id", CheckToken, updateUser);

module.exports = router;
