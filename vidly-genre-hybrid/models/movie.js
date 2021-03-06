const Joi = require("joi");
const mongoose = require("mongoose");
const { genreSchema, validateGenre } = require("./genre");

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 50,
  },
  genre: { type: genreSchema, required: true },
  numberInStock: { type: Number, required: true, min: 0, max: 255 },
  dailyRentalRate: { type: Number, required: true, min: 0, max: 1000 },
});

const Movie = mongoose.model("Movie", movieSchema);

function validateMovie(movie) {
  const schema = {
    genreId: Joi.string().required(),
    title: Joi.string().min(3).required(),
    numberInStock: Joi.number().required(),
    dailyRentalRate: Joi.number().required(),
  };

  return Joi.validate(movie, schema);
}

exports.Movie = Movie;
exports.validateMovie = validateMovie;
