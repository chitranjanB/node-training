const express = require("express");
const mongoose = require("mongoose");
const Joi = require("joi");

mongoose
  .connect("mongodb://localhost/vidly")
  .then(() => console.log("connected to mongodb"))
  .catch(() => console.log("connection failed"));

const genreSchema = mongoose.Schema({
  id: Number,
  name: String,
});

const Genre = mongoose.model("Genre", genreSchema);

const router = express.Router();

router.get("/", async (req, res) => {
  const genres = await Genre.find();
  res.send(genres);
});

router.post("/", async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genreData = new Genre({
    id: req.body.id,
    name: req.body.name,
  });

  await genreData.save();
  res.send(genreData);
});

router.put("/:id", async (req, res) => {
  const genreObj = await Genre.findOne({ id: req.params.id });
  if (!genreObj)
    return res.status(404).send("The genre with the given ID was not found.");

  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  genreObj.name = req.body.name;
  const updated = await Genre.updateOne(
    { id: genreObj.id },
    {
      $set: { name: genreObj.name },
    }
  );
  res.send(genreObj);
});

router.delete("/:id", async (req, res) => {
  const genre = await Genre.find({ id: req.params.id });
  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");

  await Genre.deleteOne({ id: req.params.id });

  res.send(genre);
});

router.get("/:id", async (req, res) => {
  const genre = await Genre.find({ id: req.params.id });
  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");
  res.send(genre);
});

function validateGenre(genre) {
  const schema = {
    id: Joi.number(),
    name: Joi.string().min(3).required(),
  };

  return Joi.validate(genre, schema);
}

module.exports = router;
