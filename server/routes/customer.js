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
  removeFriend,
  addFriend,
  getAllFriends,
  getAllUsers,
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

router.get(
  "/:username/get-all-friends",
  authenticateJWT,
  authenicateCustomer,
  getAllFriends
);

router.post(
  "/:username/add-friends",
  authenticateJWT,
  authenicateCustomer,
  addFriend
);

router.delete(
  "/:username/delete-friend/:friendId",
  authenticateJWT,
  authenicateCustomer,
  removeFriend
);

router.get(
  "/get-all-customers",
  authenticateJWT,
  authenicateCustomer,
  getAllUsers
);

module.exports = router;
