const express = require("express");
const router = express.Router();

const {
  getNotes,
  getOneNote,
  createNote,
  updateNote,
  deleteNote,
} = require("../controllers/notes");

router.route("/")
    .get(getNotes)
    .post(createNote);
    
router.route("/:id")
    .get(getOneNote)
    .put(updateNote)
    .delete(deleteNote);

module.exports = router;
