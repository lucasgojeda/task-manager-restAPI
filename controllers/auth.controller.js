const { response } = require("express");

const bcrypt = require("bcryptjs");

const User = require("../models/user");

const { jwtGenerate } = require("../helpers/jwt-generate");

const login = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const userDB = await User.findOne({ email });

    if (!userDB) {
      return res.status(400).json({
        msg: "User / Password are not correct - email",
      });
    }

    if (!userDB.status) {
      return res.status(400).json({
        msg: "User not found - Status: false",
      });
    }

    const validPassword = bcrypt.compareSync(password, userDB.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: "Password incorrect - Password",
      });
    }

    const { id } = userDB;
    const token = await jwtGenerate(id);

    res.status(200).json({
      msg: "OK",
      user: {
        _id: userDB._id,
        name: userDB.name,
        email: userDB.email,
        token
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Login failed - Talk to the administrator.",
    });
  }
};

const register = async (req, res = response) => {

  try {
    const { name, password, email } = req.body;

    const user = await User.findOne({ email })

    if (user) {
      return res.status(400).json({
        msg: `The user with the email ${email} already exists`
      });
    }

    const userNew = new User({ name, password, email });

    const salt = bcrypt.genSaltSync();
    userNew.password = bcrypt.hashSync(password, salt);

    const userNewFinish = await userNew.save();


    const { id } = userNewFinish;

    const [token, userDB] = await Promise.all([
      jwtGenerate(id),
      User.findById(id)
    ]);


    res.json({
      msg: 'OK',
      user: {
        _id: userDB._id,
        name: userDB.name,
        email: userDB.email,
        token
      }
    })

  } catch (error) {
    console.log(error);
    return res.status(400).json({
      msg: error
    })
  }


};

const tokenRevalidate = async (req, res = response) => {
  try {
    const { _id, name, email } = req.user;

    const token = await jwtGenerate(_id);

    res.json({
      msg: "OK",
      user: {
        _id,
        name,
        email,
        token
      }
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "Error al renovar el token"
    });
  }
};

module.exports = {
  login,
  register,
  tokenRevalidate,
};
