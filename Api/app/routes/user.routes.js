module.exports = (app) => {
  const users = require("../controllers/userController.js");

  app.post("/users", users.create);
};
