const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

//movieExists middleware
async function movieExists(request, response, next) {
  const movie = await service.read(request.params.movieId);
  if (movie) {
    response.locals.movie = movie;
    return next();
  }
  next({ status: 404, message: `Movie cannot be found.` });
}

//read
function read(request, response) {
  const { movie: data } = response.locals;
  response.json({ data });
}

//list
async function list(request, response, next) {
  try {
    const showingTrue = request.query.is_showing;
    if (showingTrue === "true") {
      const dataTrue = await service.isShowingList();
      response.json({ data: dataTrue });
    }
    const datas = await service.list();
    response.json({ data: datas });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  read: [asyncErrorBoundary(movieExists), read],
  list: [asyncErrorBoundary(list)],
  movieExists,
};