const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");


//reviewExists
async function reviewExists(request, response, next) {
  const review = await service.read(request.params.reviewId);
  if (review) {
    response.locals.review = review;
    return next();
  }
  next({ status: 404, message: `Review cannot be found.` });
}

//list
async function list(request, response, next) {
    const data = await service.list(request.params.movieId);
  response.json({ data });
}

//update
async function update(request, response, next) {
  const updatedReview = {
    ...request.body.data,
    review_id: response.locals.review.review_id,
  };
  const critic = await service.listOfCriticInfo(response.locals.review.critic_id);
  await service.update(updatedReview);
  const updatedReviewAgain = await service.read(updatedReview.review_id);
  const data = {
    ...updatedReviewAgain,
    critic,
  };
  response.json({ data });
}

//destroy
async function destroy(request, response, next) {
  const { review_id } = response.locals.review;
  await service.destroy(review_id);
  response.sendStatus(204);
}

module.exports = {
  list: asyncErrorBoundary(list),
  delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
  update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)],
};