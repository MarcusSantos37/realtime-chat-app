const {
  register,
  login,
  getUsers,
} = require("../controllers/usersController.js");

const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);
router.get("/users/:id", getUsers);

module.exports = router;
