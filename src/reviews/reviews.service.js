const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

// this the critic object
const objectCritic = mapProperties({
  critic_id: "critic.critic_id",
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
  created_at: "critic.created_at",
  updated_at: "critic.updated_at",
});


function read(reviewId) {
  return knex("reviews")
    .select("*")
    .where({ review_id: reviewId })
    .first();
}


function list(movieId) {
  return knex("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select("*")
    .where({ movie_id: movieId })
    .then((criticProperty) => criticProperty.map(objectCritic));
}


function update(updatedReview) {
  return knex("reviews")
      .update(updatedReview, "*")
      .where({ review_id: updatedReview.review_id })
}

function listOfCriticInfo(criticId) {
  return knex("critics as c")
    .select("*")
    .where({critic_id: criticId })
    .first();
}


function destroy(reviewId) {
  return knex("reviews")
    .where({review_id: reviewId})
    .del();
}

module.exports = {
  list,
  read,
  destroy,
  update,
  listOfCriticInfo,
};