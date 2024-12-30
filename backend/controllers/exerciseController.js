const Exercise = require("../models/Exercise");

// @desc    Get all exercises
// @route   GET /api/exercises
// @access  Public
const getExercises = async (req, res, next) => {
  try {
    const exercises = await Exercise.find();
    res.status(200).json(exercises);
  } catch (error) {
    next(error);
  }
};

// @desc    Add a new exercise
// @route   POST /api/exercises
// @access  Public
const addExercise = async (req, res, next) => {
  const { name, description, image, dailyTime } = req.body;

  try {
    const exercise = new Exercise({ name, description, image, dailyTime });
    const savedExercise = await exercise.save();
    res.status(201).json(savedExercise);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getExercises,
  addExercise,
};
