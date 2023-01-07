const { response, request } = require("express");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const jwtValidate = async (req = request, res = response, next) => {
  try {
    const token = req.header("x-token");

    if (!token || token === undefined) {
      return res.status(401).json({
        msg: "There is no token in the request",
      });
    }

    const { id } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

    req.id = id;

    const user = await User.findById(id)

    req.user = user;

    next();
  } catch (err) {
    res.status(401).json({
      msg: "invalid token.",
      err,
    });
  }
};

module.exports = {
  jwtValidate,
};
