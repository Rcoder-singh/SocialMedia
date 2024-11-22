let User = require("../Models/userSchema");
const registerUser = async (req, res) => {
  let { name, email, password, address } = req.body;
  try {
    let user = await User.create({
      name,
      email,
      password,
      address,
    });
    res.json({ msg: "User created successfully", success: true, user });
  } catch (error) {
    res.json({
      msg: "Error in creating user..!",
      success: false,
      error: error.message,
    });
  }
};
module.exports={registerUser,}