const jwt = require("jsonwebtoken");
const JWT_SECRET = "Andres";

let CheckToken = (req, res, next) => {
  let token = req.headers.authorization;
  console.log("CheckToken",token);
  try {
    var decodedToken = jwt.verify(token, JWT_SECRET);
    console.log(decodedToken);
    req.user = decodedToken._id; // {_id:userID} /
    next();
  } catch (error) {
    console.log("Token Error", error);
    return res.json({ msg: "Provide valid token!", success: false });
  }
};
module.exports = CheckToken;
