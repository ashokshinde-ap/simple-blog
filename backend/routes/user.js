const express = require("express");
const router = express.Router();

const UserController = require("../controllers/userController");

router.post("/login", UserController.login);
router.post("/create", UserController.create);

module.exports = router;