const express = require("express");
const router = express.Router();

const {
  getUsers,
  createUser,
  deleteUser,
} = require("../controllers/users");

router.route("/")
    .get(getUsers)
    .post(createUser);

router.route("/:id")
    .delete(deleteUser);

module.exports = router;
