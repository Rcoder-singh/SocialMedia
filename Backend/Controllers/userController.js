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

const loginUser = async (req, res) => {
  let { email, password } = req.body;
  try {
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      if (existingUser.password == password) {
        return res.json({
          msg: "User login successfully",
          success: true,
          user: existingUser,
        });
      } else {
        return res.json({ msg: "Wrong password...!" });
      }
    } else {
      res.json({
        msg: "Error in logging,user not registered..!",
        success: false,
      });
    }
  } catch (error) {
    res.json({
      msg: "Error in logging user..!",
      success: false,
      error: error.message,
    });
  }
};

const updateUser = async (req, res) => {};

module.exports = { registerUser, loginUser };
