let User = require("../Models/userSchema");
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);
const jwt = require("jsonwebtoken");
const JWT_SECRET = "Andres";
const registerUser = async (req, res) => {
  let { name, email, password, address } = req.body;
  try {
    if (!name) {
      return res.json({
        msg: "Name is required!",
        success: false,
        name: "name",
      });
    }
    if (!email) {
      return res.json({
        msg: "Email is required!",
        success: false,
        email: "email",
      });
    }
    if (!password) {
      return res.json({
        msg: "Password is required!",
        success: false,
        password: "password",
      });
    }
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ msg: "User already registered..!", success: false });
    } else {
      let hashedPassword = await bcrypt.hashSync(password, salt);
      let user = await User.create({
        name,
        email,
        password: hashedPassword,
        address,
      });
      res.json({ msg: "User created successfully", success: true, user });
    }
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
      let comparedPassword = bcrypt.compareSync(
        password,
        existingUser.password
      );
      if (comparedPassword) {
        var token = jwt.sign({ _id: existingUser._id }, JWT_SECRET);
        return res.json({
          msg: "User login successfully",
          success: true,
          user: existingUser,
          token: token,
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

const updateUser = async (req, res) => {
  let _id = req.params._id;
  let userId = req.user;

  console.log("From params", _id);
  console.log("From Token", userId);

  if (userId !== _id) {
    return res.json({ msg: "unauthorized", success: false });
  }

  let { name, password, profilePic, coverPic, address, bio } = req.body;
  let hashedPassword;
  if (password) {
    hashedPassword = bcrypt.hashSync(password, salt);
  }
  try {
    let data = await User.findByIdAndUpdate(
      _id,
      {
        $set: { name, password:hashedPassword, profilePic, coverPic, address, bio },
      },
      { new: true }
    );
    res.json({ msg: "User updated successfully", success: true, data });
  } catch (error) {
    res.json({
      msg: "Error in updating user..!",
      success: false,
      error: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  let _id = req.params._id;
  console.log(_id);
  try {
    await User.findByIdAndDelete(_id);
    res.json({ msg: "User deleted successfully", success: true });
  } catch (error) {
    res.json({
      msg: "Error in deleting user..!",
      success: false,
      error: error.message,
    });
  }
};

module.exports = { registerUser, loginUser, updateUser, deleteUser };
