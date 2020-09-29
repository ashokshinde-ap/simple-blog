const User = require("../models/user.model.js");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.create = (req, res) => {
  User.findOne({ email: req.body.email }).then((user) => {
    // console.log(user);
    if (!user) {
      const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
      });
      user
        .save()
        .then((data) => {
          res.status(201).send({ data: data, success: true });
        })
        .catch((err) => {
          res.status(400).json({
            error: error,
          });
        });
    } else {
      return res
        .status(409)
        .json({ success: false, error: "user already exits" });
    }
  });
};


