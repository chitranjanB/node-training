const { Genre, validateGenre } = require("../models/genre");
const { Movie, validateMovie } = require("../models/movie");

const express = require("express");
const router = express.Router();

router.post("/genre", async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let genre = new Genre({
    name: req.body.name,
  });

  genre = await genre.save();
  res.send(genre);
});

router.post("/movie", async (req, res) => {
  const { error } = validateMovie(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let genre = await Genre.findById(req.body.genreId);
  if (!genre) {
    res.status(400).send("error");
    return;
  }

  let movie = new Movie({
    title: req.body.title,
    genre: { _id: genre._id, name: genre.name },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
  });

  movie = await movie.save();
  res.send(movie);
});

router.get("/", async (req, res) => {
  let movies = await Movie.find({}).select({
    _id: 0,
    title: 1,
    numberInStock: 1,
    dailyRentalRate: 1,
    "genre.name": 1,
  });

  res.send(movies);
});

router.get("/genres", async (req, res) => {
  let genres = await Genre.find({});
  res.send(genres);
});

module.exports = router;
