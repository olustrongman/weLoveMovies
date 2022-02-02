const knex = require("../db/connection");

// This query return a list of all movies
function list() {
  return knex("movies").select("*");
}

// GET /movies?is_showing=true
function isShowingList() {
  return knex("movies as m")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .distinct()
    .select("m.*")
    .where({ "mt.is_showing": true });
}

// GET /movies
function read(movieId) {
  return knex("movies as m")
    .select("*")
    .where({ "m.movie_id": movieId })
    .first();
}

module.exports = {
  list,
  isShowingList,
  read,
};