const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const demoTest = (req, res) => {
  console.log("Hello");
  res.status(200).json({
    message: "success",
  });
};
const login = (req, res) => {
  username = req.body.email;
  password = req.body.password;

  User.findOne({ email: username }).then((user) => {
    if (user) {
      bcrypt.compare(password, user.password, function (err, result) {
        if (err) {
          return res.status(500).json({
            message: "Illegal arguments:",
          });
        }
        if (result) {
          let token = jwt.sign({ email: user.email }, "UsedToDecodeKey", {
            expiresIn: "1h",
          });
          return res.status(200).json({
            message: "Login Successfully.",
            userId: user._id,
            token,
          });
        } else {
          return res.status(401).json({
            message: "Invalid Password.",
          });
        }
      });
    } else {
      return res.status(404).json({
        message: "Invalid Username.",
      });
    }
    // console.log("hello");
  });
};

const create = (req, res) => {
  console.log(req.body.email);
  User.findOne({ email: req.body.email })
    .then((response) => {
      let user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
      });
      user
        .save()
        .then(() => {
          return res.status(200).json({
            message: "Successfully registered.",
          });
        })
        .catch((error) => {
          return res.status(409).json({
            error: error,
            message: "User Already Exists.",
          });
        });
    })
    .catch(() => {
      // console.log(error);
      return res.status(500).json({
        message: "An Error Occured.",
      });
    });
};

module.exports = {
  login,
  create,
  demoTest,
};
