const knex = require("../db/connection");
const reduceProperties = require("../utils/reduce-properties");

const reduce = reduceProperties("theater_id", {
  movie_id: ["movies", null, "movie_id"],
  title: ["movies", null, "title"],
  rating: ["movies", null, "rating"],
  runtime_in_minutes: ["movies", null, "runtime_in_minutes"],
  description: ["movies", null, "description"],
  image_url: ["movies", null, "image_url"],
}); 



//list of theaters
function theaterList() {
  return knex("theaters as t")
    .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
    .join("movies as m", "mt.movie_id", "m.movie_id")
    .select("*")
    .then((createdList) => reduce(createdList));
}


//movies theater list
function theatersMovieList(movieId) {
  return knex("theaters as t")
    .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
    .select("*")
    .where({movie_id: movieId});
}




module.exports = {
  theaterList,
  theatersMovieList,
};
