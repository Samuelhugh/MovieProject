const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const SECRET = process.env.JWT_SECRET;

module.exports.register = async (req, res) => {
  console.log("IN USER REGISTRATION");

  try {
    const user = new User(req.body);
    const newUser = await user.save();
    console.log("NEW USER: ", newUser);

    const userToken = jwt.sign(
      {
        _id: newUser._id,
        userName: newUser.userName,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
      },
      SECRET
    );

    res
      .status(201)
      .cookie("userToken", userToken, {
        expires: new Date(Date.now() + 900000000),
      })
      .json({
        successMessage: "Account Was Successfully Created! You Can Now Login.",
        user: {
          _id: newUser._id,
          userName: newUser.userName,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          email: newUser.email,
        },
      });
  } catch (e) {
    // so could I redirect here (or the backend in general?)
    console.log("ERROR IN USER REGISTRATION: ", e);
    res.status(400).json(e);
  }
};

module.exports.login = async (req, res) => {
  console.log("IN USER LOGIN");

  const userDoc = await User.findOne({ email: req.body.email });
  if (!userDoc) {
    res.status(400).json({ message: "Invalid Login!" });
  } else {
    try {
      const isPasswordValid = await bcrypt.compare(
        req.body.password,
        userDoc.password
      );
      if (!isPasswordValid) {
        res.status(400).json({ message: "Invalid Login!" });
      } else {
        const userToken = jwt.sign(
          {
            _id: userDoc._id,
            userName: userDoc.userName,
            firstName: userDoc.firstName,
            lastName: userDoc.lastName,
            email: userDoc.email,
          },
          SECRET
        );

        res
          .cookie("userToken", userToken, {
            expires: new Date(Date.now() + 900000000),
          })
          .json({
            successMessage: "Successfully Logged in!",
            user: {
              _id: userDoc._id,
              userName: userDoc.userName,
              firstName: userDoc.firstName,
              lastName: userDoc.lastName,
              email: userDoc.email,
            },
          });
      }
    } catch (e) {
      console.log("ERROR IN USER LOGIN: ", e);
      res.status(400).json({ message: "Invalid Login!" });
    }
  }
};

module.exports.logout = (req, res) => {
  console.log("IN USER LOGOUT");

  res.clearCookie("userToken");
  res.status(201).json({ message: "Logged out Successfully!" });
};

module.exports.getLoggedInUser = async (req, res) => {
  console.log("IN GET USER");

  try {
    const userPayload = await jwt.verify(req.cookies.userToken, SECRET);
    const verUser = await User.findOne({ _id: userPayload._id });
    console.log("VERIFIED USER: ", verUser);
    res.json(verUser);
  } catch (e) {
    console.log("ERROR IN GETTING USER: ", e);
    res.status(400).json(e);
  }
};
