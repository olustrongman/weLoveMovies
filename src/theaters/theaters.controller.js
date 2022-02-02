const service = require("./theaters.service");
const movieController = require("../movies/movies.controller");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

//list
async function list(request, response, next) {
  const { movieId } = request.params;
  const data = movieId
    ? await service.theatersMovieList(movieId)
    : await service.theaterList();
  response.json({ data });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
};