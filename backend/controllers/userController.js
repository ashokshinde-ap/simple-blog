const User = require("../models/user");
const bcrypt = require("bcryptjs");

const login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((response) => {
      // console.log(req.body.password);
      try {
        if (response) {
          let userValid = bcrypt.compareSync(
            req.body.password,
            response.password
          );
          // console.log(userValid);
          if (userValid) {
            res.status(200).json({
              message: "success",
            });
          } else {
            res.status(401).json({
              message: "Invalid Creditial",
            });
          }
        } else {
          throw new Error("User Not Found");
        }
      } catch (error) {
        res.status(404).json({
          message: error.message,
        });
      }
    })
    .catch((error) => {
      res.json({
        message: "User not Found!",
      });
    });
};

const create = (req, res, next) => {
  // user.findOne({ email: req.body.email });
  User.findOne({ email: req.body.email })
    .then((response) => {
      try {
        if (!response) {
          let user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8),
          });
          user
            .save()
            .then(() => {
              res.json({
                message: "user register successfully",
              });
            })
            .catch((error) => {
              res.status(500).json({
                error: error,
                message: "An error occured",
              });
            });
        } else {
          throw new Error("User Already Exit");
        }
      } catch (error) {
        res.status(409).json({
          message: error.message,
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Something went wrong",
      });
    });
};

module.exports = {
  login,
  create,
};
