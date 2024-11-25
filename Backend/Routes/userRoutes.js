const express = require("express");
const router = express.Router();
const { registerUser, loginUser, updateUser } = require("../Controllers/userController");

router.post("/register", registerUser);
router.post("/login",loginUser );
router.post("/update/:_id", updateUser);


module.exports = router;
