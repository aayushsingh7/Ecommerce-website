const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const userAuthentication = async (req, res, next) => {
  let token = req.cookies.amazon;
  try {
    if (!token) {
      return res
        .status(401)
        .send({ success: false, error: "No Token Provided" });
    } else {
      let verifyToken = await jwt.verify(token, process.env.SECRET_KEY);
      if (!verifyToken) {
        return res.status(401).send({ success: false, error: "Invalid Token" });
      }
      let getUser = await User.findOne({ _id: verifyToken._id });
      if (getUser) {
        req.userData = getUser;
        next();
      } else {
        return res.status(404).send({ success: false, msg: "No user found" });
      }
    }
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

module.exports = userAuthentication;
