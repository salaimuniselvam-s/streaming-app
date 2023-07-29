const express = require("express");
const {
  authenticateJWT,
  authenicateCustomer,
} = require("../middleware/verifyJwtToken.js");
const {
  getAllMoviesByCustomerPlan,
  addToFavouriteMovieForCustomer,
  removeFromFavouriteMovieForCustomer,
  getFavouriteMoviesForCustomer,
} = require("../controllers/customer");

const router = express.Router();

router.get(
  "/get-all-videos",
  authenticateJWT,
  authenicateCustomer,
  getAllMoviesByCustomerPlan
);

router.post(
  "/add-to-favourite-movie/:movieId",
  authenticateJWT,
  authenicateCustomer,
  addToFavouriteMovieForCustomer
);
router.delete(
  "/remove-from-favourite-movie/:movieId",
  authenticateJWT,
  authenicateCustomer,
  removeFromFavouriteMovieForCustomer
);

router.get(
  "/favourite-movies",
  authenticateJWT,
  authenicateCustomer,
  getFavouriteMoviesForCustomer
);
module.exports = router;
