const express = require("express");
const {
  getExercises,
  addExercise,
} = require("../controllers/exerciseController");

const router = express.Router();

// Routes
router.get("/", getExercises);
router.post("/", addExercise);

module.exports = router;
