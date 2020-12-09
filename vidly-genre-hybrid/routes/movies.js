const { Genre, validateGenre } = require("../models/genre");
const { Movie, validateMovie } = require("../models/movie");

const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  // const { error } = validate(req.body);
  // if (error) return res.status(400).send(error.details[0].message);

  let genre = new Genre({ name: req.body.genre.name });
  console.log("here", genre);

  genre = await genre.save();
  let movie = new Movie({
    title: req.body.title,
    genre: genre,
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
  });
  genre = await genre.save();
  movie = await movie.save();

  res.send(movie);
});

router.get("/", async (req, res) => {
  // const { error } = validate(req.body);
  // if (error) return res.status(400).send(error.details[0].message);

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
  // const { error } = validate(req.body);
  // if (error) return res.status(400).send(error.details[0].message);

  let genres = await Genre.find({});
  res.send(genres);
});

module.exports = router;
