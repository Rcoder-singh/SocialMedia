const mongoose = require("mongoose");

let UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "User is already registered"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    address: {
      type: String,
    },
    profilePic: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/03/04/22/35/avatar-659652_960_720.png",
    },
    coverPic: {
      type: String,
      default: "Upload Picture",
    },
  },
  { timestamps: true }
);

UserSchema.add({
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
  resetToken: { type: String, default: null },
  bio: { type: String, default: "Write here" },
});

module.exports = mongoose.model("user", UserSchema);
