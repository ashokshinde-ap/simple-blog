const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authenticate");

const UserController = require("../controllers/userController");

router.post("/login", UserController.login);
router.post("/create", UserController.create);
router.get("/demoTest", authenticate, UserController.demoTest);

module.exports = router;
