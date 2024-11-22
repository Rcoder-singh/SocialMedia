const mongoose = require("mongoose");
const connectToDB = () => {
  mongoose
    .connect("mongodb://127.0.0.1:27017/SocialMedia")
    .then(() => {
      console.log("Successfully connected to MongoDB server:SocialMedia");
    })
    .catch(() => {
      console.log("Error in connecting MongoDB server:SocialMedia");
    });
};
module.exports = connectToDB;
